"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { m as motion, AnimatePresence } from "framer-motion";
import { StaggerContainer, StaggerItem } from "./animated-hero";

const TYPE_COLORS: Record<string, string> = {
  "Inner Line Permit": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "National Park Entry Permit": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "National Park Safari Permit": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "Biometric Registration": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Rohtang Pass Permit": "bg-orange-500/10 text-orange-400 border-orange-500/30",
};

export function PermitsContent({ permits }: { permits: any[] }) {
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const types = [...new Set(permits.map((p) => p.type))];

  const filtered = permits.filter((p) => {
    if (typeFilter && p.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const destName = Array.isArray(p.destinations) ? p.destinations[0]?.name : p.destinations?.name;
      if (
        !p.type.toLowerCase().includes(q) &&
        !(destName?.toLowerCase().includes(q)) &&
        !p.who_needs?.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by destination or permit type..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border p-3 text-center">
          <div className="text-lg font-mono font-bold text-primary">{permits.filter((p) => p.cost_inr === 0).length}</div>
          <div className="text-xs text-muted-foreground">Free permits</div>
        </div>
        <div className="rounded-xl border border-border p-3 text-center">
          <div className="text-lg font-mono font-bold text-primary">{permits.filter((p) => p.processing_time?.includes("nstant") || p.processing_time?.includes("nline")).length}</div>
          <div className="text-xs text-muted-foreground">Instant/Online</div>
        </div>
        <div className="rounded-xl border border-border p-3 text-center">
          <div className="text-lg font-mono font-bold text-primary">{permits.filter((p) => p.foreigners?.includes("NOT")).length}</div>
          <div className="text-xs text-muted-foreground">Restricted for foreigners</div>
        </div>
      </div>

      {/* Permits list */}
      <StaggerContainer className="space-y-3" staggerDelay={0.05}>
        {filtered.map((permit) => {
          const isOpen = openId === permit.id;
          const destName = Array.isArray(permit.destinations) ? permit.destinations[0]?.name : permit.destinations?.name;
          const colorClass = TYPE_COLORS[permit.type] || "bg-muted/50 text-muted-foreground border-border";

          return (
            <StaggerItem key={permit.id}>
            <div className="rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : permit.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/20 transition-colors"
              >
                <Image src={`/images/destinations/${permit.destination_id}.jpg`} width={48} height={48} className="rounded-lg object-cover flex-shrink-0" sizes="48px" alt={permit.destination_id?.replace(/-/g, " ") ?? "destination"} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${colorClass}`}>
                      {permit.type}
                    </span>
                    {permit.cost_inr === 0 && (
                      <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-1 text-xs font-medium">FREE</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm">
                    {destName}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{permit.who_needs}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-sm font-mono font-bold">
                    {permit.cost_inr > 0 ? `₹${permit.cost_inr}` : "Free"}
                  </div>
                  <div className="text-xs text-muted-foreground">{permit.processing_time}</div>
                </div>
                <span className="text-muted-foreground shrink-0">{isOpen ? "−" : "+"}</span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border"
                  >
                    <div className="p-4 space-y-4">
                      {/* How to get */}
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em] mb-1">How to Get</h4>
                        <p className="text-sm">{permit.how_to_get}</p>
                      </div>

                      {/* Documents needed */}
                      {permit.documents_needed?.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em] mb-1">Documents Needed</h4>
                          <ul className="space-y-1">
                            {permit.documents_needed.map((doc: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-0.5 text-xs">●</span>
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Foreigners */}
                      {permit.foreigners && (
                        <div className={`rounded-lg p-3 text-sm ${permit.foreigners.includes("NOT") ? "bg-red-500/5 border border-red-500/20 text-red-300" : "bg-muted/30"}`}>
                          <span className="font-medium">Foreigners: </span>{permit.foreigners}
                        </div>
                      )}

                      {/* Details grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <div className="rounded-lg bg-muted/30 p-2">
                          <div className="text-muted-foreground/70">Cost</div>
                          <div className="font-mono font-bold mt-0.5">{permit.cost_inr > 0 ? `₹${permit.cost_inr}` : "Free"}</div>
                        </div>
                        <div className="rounded-lg bg-muted/30 p-2">
                          <div className="text-muted-foreground/70">Processing</div>
                          <div className="font-medium mt-0.5">{permit.processing_time}</div>
                        </div>
                        <div className="rounded-lg bg-muted/30 p-2">
                          <div className="text-muted-foreground/70">Validity</div>
                          <div className="font-medium mt-0.5">{permit.validity}</div>
                        </div>
                      </div>

                      {/* Pro tip */}
                      {permit.pro_tip && (
                        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                          <p className="text-sm text-primary/90">
                            <span className="font-semibold">Pro tip: </span>{permit.pro_tip}
                          </p>
                        </div>
                      )}

                      {/* Link to destination */}
                      <Link
                        href={`/${locale}/destination/${permit.destination_id}`}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        View {destName} details →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p>No permits match your search</p>
        </div>
      )}
    </div>
  );
}
