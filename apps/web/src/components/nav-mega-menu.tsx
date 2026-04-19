"use client";

import { m as motion, AnimatePresence } from "framer-motion";
// All links use <a> tags to avoid RSC streaming conflicts when mega menu unmounts
import { useLocale, useTranslations } from "next-intl";
import { FALLBACK } from "@/lib/stats";
import { REGION_GROUPS, STATE_MAP } from "@/lib/seo-maps";

export type PanelType = "experiences" | "plan" | "learn" | "browse" | null;

const panelAnimation = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.035 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

/* ─── Icons (20x20 inline SVG, stroke-based) ─── */

function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function MountainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 2 4h2" />
      <path d="M2 21h20" />
      <path d="m2 21 7-11 4 7 3-4 6 8" />
    </svg>
  );
}

function TentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 21 12 3l8.5 18" />
      <path d="M12 21V11" />
      <path d="m8 21 4-10 4 10" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" /><path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function RoadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21 8 3" /><path d="M19 21 16 3" />
      <path d="M12 7v2" /><path d="M12 13v2" /><path d="M12 19v2" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function AiSparkleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      <path d="M5 3v2" /><path d="M19 19v2" /><path d="M4 4h2" /><path d="M18 20h2" />
    </svg>
  );
}

/* ─── Menu item component ─── */

function MenuItem({
  href,
  icon: Icon,
  label,
  desc,
  count,
  onNavigate,
}: {
  href: string;
  icon: () => React.JSX.Element;
  label: string;
  desc: string;
  count?: string;
  onNavigate: () => void;
}) {
  // Use <a> tags instead of <Link> to avoid RSC streaming conflicts
  // when the mega menu unmounts during client-side navigation
  return (
    <motion.div variants={staggerItem}>
      <a
        href={href}
        onClick={onNavigate}
        className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
      >
        <span className="mt-0.5 text-muted-foreground group-hover:text-primary transition-colors">
          <Icon />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{label}</span>
            {count && (
              <span className="text-[10px] font-mono font-bold bg-muted rounded-full px-1.5 py-0.5 text-muted-foreground">
                {count}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
        </div>
      </a>
    </motion.div>
  );
}

/* ─── Experiences Panel ─── */

function ExperiencesPanel({ locale, onNavigate }: { locale: string; onNavigate: () => void }) {
  const t = useTranslations("nav");

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-3 gap-6">
      {/* Primary */}
      <div className="space-y-1">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Explore</p>
        <MenuItem href={`/${locale}/collections`} icon={GridIcon} label={t("collections")} desc="Curated themed lists" count={String(FALLBACK.collections)} onNavigate={onNavigate} />
        <MenuItem href={`/${locale}/routes`} icon={RouteIcon} label={t("routes")} desc="Multi-day road trips" count={String(FALLBACK.routes)} onNavigate={onNavigate} />
        <MenuItem href={`/${locale}/treks`} icon={MountainIcon} label={t("treks")} desc="Trails & summit hikes" count={String(FALLBACK.treks)} onNavigate={onNavigate} />
      </div>
      {/* Secondary */}
      <div className="space-y-1">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Activities</p>
        <MenuItem href={`/${locale}/camping`} icon={TentIcon} label={t("camping")} desc="Camp under the stars" onNavigate={onNavigate} />
        <MenuItem href={`/${locale}/festivals`} icon={SparkleIcon} label={t("festivals")} desc="Cultural celebrations" count={String(FALLBACK.festivals)} onNavigate={onNavigate} />
        <MenuItem href={`/${locale}/stays`} icon={HouseIcon} label={t("stays")} desc="Verified places to sleep" onNavigate={onNavigate} />
      </div>
      {/* Featured card */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent p-5 flex flex-col justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 mb-2">Featured</p>
          <h4 className="text-sm font-semibold text-foreground">Best Destinations This Month</h4>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            See which destinations score 5/5 right now — weather, crowds, and accessibility all considered.
          </p>
        </div>
        <a
          href={`/${locale}/where-to-go/${["", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"][new Date().getMonth() + 1]}`}
          onClick={onNavigate}
          className="mt-4 inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View this month's picks
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1"><path d="m9 18 6-6-6-6" /></svg>
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Plan Panel ─── */

function PlanPanel({ locale, onNavigate }: { locale: string; onNavigate: () => void }) {
  const t = useTranslations("nav");
  const currentMonthSlug = ["", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"][new Date().getMonth() + 1];

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-5 gap-6">
      {/* Tools */}
      <div className="col-span-3 space-y-1">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Tools</p>
        <div className="grid grid-cols-2 gap-x-4">
          <MenuItem href={`/${locale}/where-to-go/${currentMonthSlug}`} icon={CalendarIcon} label={t("whereToGoNow")} desc="Best destinations this month" onNavigate={onNavigate} />
          <MenuItem href={`/${locale}/build-route`} icon={MapPinIcon} label={t("buildRoute")} desc="Design your road trip" onNavigate={onNavigate} />
          <MenuItem href={`/${locale}/gap-year`} icon={CalendarIcon} label="Gap Year Planner" desc="3–12 months, month by month" onNavigate={onNavigate} />
          <MenuItem href={`/${locale}/permits`} icon={ShieldIcon} label={t("permits")} desc="Required passes & permits" onNavigate={onNavigate} />
          <MenuItem href={`/${locale}/road-conditions`} icon={RoadIcon} label={t("roads")} desc="Latest road status" onNavigate={onNavigate} />
        </div>
      </div>
      {/* AI Plan highlight */}
      <div className="col-span-2 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 flex flex-col justify-between">
        <div>
          <span className="text-primary"><AiSparkleIcon /></span>
          <h4 className="text-base font-bold text-foreground mt-2">AI Trip Planner</h4>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Tell us your dates, interests, and budget. Get a complete itinerary with honest scores for every stop.
          </p>
        </div>
        <a
          href={`/${locale}/plan`}
          onClick={onNavigate}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Start Planning
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Learn Panel ─── */

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function LearnPanel({ locale, onNavigate }: { locale: string; onNavigate: () => void }) {
  const t = useTranslations("nav");

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-3 gap-6">
      {/* Regular items */}
      <div className="col-span-2 space-y-1">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Read</p>
        <div className="grid grid-cols-2 gap-x-4">
          <MenuItem href={`/${locale}/blog`} icon={PenIcon} label={t("blog")} desc="Stories & insights" onNavigate={onNavigate} />
          <MenuItem href={`/${locale}/tourist-traps`} icon={AlertIcon} label={t("touristTraps")} desc="Overhyped places to skip" onNavigate={onNavigate} />
          <MenuItem href={`/${locale}/guide`} icon={BookIcon} label={t("guides")} desc="In-depth travel guides" onNavigate={onNavigate} />
          <MenuItem href={`/${locale}/superlatives`} icon={TrophyIcon} label={t("records")} desc="India's bests & firsts" onNavigate={onNavigate} />
        </div>
      </div>
      {/* Featured: For International Visitors */}
      <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent p-5 flex flex-col justify-between">
        <div>
          <span className="text-blue-400"><GlobeIcon /></span>
          <h4 className="text-base font-bold text-foreground mt-2">First Time in India?</h4>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Safety, scams, what to wear, food survival, solo female travel — the honest guide written by an Indian family.
          </p>
        </div>
        <a
          href={`/${locale}/india-travel`}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-500/20 border border-blue-500/30 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/30 transition-colors"
        >
          Start here
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Browse Panel (Region-First Design) ─── */

const REGION_CARDS: { slug: string; icon: string; description: string }[] = [
  { slug: "north", icon: "🏔️", description: "Himalayas, deserts, holy cities" },
  { slug: "west", icon: "🏖️", description: "Beaches, caves, Bollywood" },
  { slug: "northeast", icon: "🌿", description: "Living root bridges, tea gardens" },
  { slug: "east", icon: "🛕", description: "Temples, tigers, Durga Puja" },
  { slug: "central", icon: "🐅", description: "Tiger reserves, tribal art" },
  { slug: "south", icon: "🌴", description: "Backwaters, temples, spices" },
  { slug: "islands", icon: "🏝️", description: "Beaches, diving, coral reefs" },
];

function BrowsePanel({ locale, onNavigate }: { locale: string; onNavigate: () => void }) {
  function handleClick() {
    onNavigate();
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {REGION_CARDS.map((rc) => {
          const region = REGION_GROUPS[rc.slug];
          if (!region || region.states.length === 0) return null;
          const stateCount = region.states.length;
          const topStates = region.states.slice(0, 3).map((s) => STATE_MAP[s] ?? s);

          return (
            <motion.div key={rc.slug} variants={staggerItem}>
              <a
                href={`/${locale}/states?region=${rc.slug}`}
                onClick={handleClick}
                className="group block rounded-xl border border-border/40 bg-card/50 p-4 transition-all hover:border-primary/40 hover:bg-accent/50 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-lg">{rc.icon}</span>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{region.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground/70 mb-2.5">{rc.description}</p>
                <div className="flex flex-wrap gap-1">
                  {topStates.map((name) => (
                    <span key={name} className="rounded-full bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{name}</span>
                  ))}
                  {stateCount > 3 && (
                    <span className="rounded-full bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground/50">+{stateCount - 3}</span>
                  )}
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>
      {/* Full states page CTA */}
      <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
        <a
          href={`/${locale}/states`}
          onClick={handleClick}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
        >
          <MapPinIcon />
          <span>Browse all {Object.keys(STATE_MAP).length} states on map</span>
          <span className="text-muted-foreground/40">→</span>
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Main Mega Menu ─── */

export function NavMegaMenu({
  activePanel,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  activePanel: PanelType;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const locale = useLocale();

  return (
    <AnimatePresence mode="wait">
      {activePanel && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[57px] bg-black/20 z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            key={activePanel}
            {...panelAnimation}
            className="absolute left-0 right-0 top-full z-50 border-b border-border/50 bg-card/98 backdrop-blur-xl shadow-2xl"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="mx-auto max-w-7xl px-6 py-6">
              {activePanel === "experiences" && <ExperiencesPanel locale={locale} onNavigate={onClose} />}
              {activePanel === "plan" && <PlanPanel locale={locale} onNavigate={onClose} />}
              {activePanel === "learn" && <LearnPanel locale={locale} onNavigate={onClose} />}
              {activePanel === "browse" && <BrowsePanel locale={locale} onNavigate={onClose} />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
