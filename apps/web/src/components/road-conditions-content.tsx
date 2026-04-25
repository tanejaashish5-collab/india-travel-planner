"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { StaggerContainer, StaggerItem } from "./animated-hero";

const STATUS_COLORS: Record<string, string> = {
  open: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  good: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  fair: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  slow: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  poor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  risky: "bg-red-500/15 text-red-300 border-red-500/30",
  closed: "bg-red-500/15 text-red-300 border-red-500/30",
  blocked: "bg-red-500/15 text-red-300 border-red-500/30",
};

const STATUS_ICONS: Record<string, string> = {
  open: "🟢", good: "🟢", fair: "🟡", slow: "🟠",
  poor: "🟠", risky: "🔴", closed: "🔴", blocked: "🔴",
};

export function RoadConditionsContent({ reports }: { reports: any[] }) {
  const locale = useLocale();
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (statusFilter && r.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const destName = Array.isArray(r.destinations) ? r.destinations[0]?.name : r.destinations?.name;
        if (
          !r.segment?.toLowerCase().includes(q) &&
          !r.report?.toLowerCase().includes(q) &&
          !(destName?.toLowerCase().includes(q))
        ) return false;
      }
      return true;
    });
  }, [reports, statusFilter, search]);

  const statuses = [...new Set(reports.map((r) => r.status))].sort();

  const openCount = reports.filter((r) => ["open", "good"].includes(r.status)).length;
  const closedCount = reports.filter((r) => ["closed", "blocked"].includes(r.status)).length;

  return (
    <div className="space-y-6">
      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
          <div className="text-lg font-mono font-bold text-emerald-400">{openCount}</div>
          <div className="text-xs text-muted-foreground">Open / Good</div>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 text-center">
          <div className="text-lg font-mono font-bold text-yellow-400">{reports.length - openCount - closedCount}</div>
          <div className="text-xs text-muted-foreground">Fair / Slow / Risky</div>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-center">
          <div className="text-lg font-mono font-bold text-red-400">{closedCount}</div>
          <div className="text-xs text-muted-foreground">Closed / Blocked</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search road segments..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{STATUS_ICONS[s] || ""} {s}</option>
          ))}
        </select>
      </div>

      {/* Reports list */}
      <StaggerContainer className="space-y-3" staggerDelay={0.05}>
        {filtered.map((report) => {
          const destName = Array.isArray(report.destinations) ? report.destinations[0]?.name : report.destinations?.name;
          const colorClass = STATUS_COLORS[report.status] || "bg-muted/50 text-muted-foreground border-border";
          const icon = STATUS_ICONS[report.status] || "⚪";
          const reportedDate = report.reported_at ? new Date(report.reported_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : null;

          return (
            <StaggerItem key={report.id}>
            <div className="rounded-xl border border-border p-4 hover:border-border/80 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <Image src={`/images/destinations/${report.destination_id}.jpg`} width={48} height={48} className="rounded-lg object-cover flex-shrink-0" sizes="48px" alt={destName ?? report.destination_id} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <span>{icon}</span>
                    {report.segment}
                  </h3>
                  {destName && (
                    <Link
                      href={`/${locale}/destination/${report.destination_id}`}
                      className="text-xs text-primary hover:underline"
                    >
                      {destName}
                    </Link>
                  )}
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${colorClass}`}>
                  {report.status}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{report.report}</p>

              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground/60">
                {reportedDate && <span>Updated: {reportedDate}</span>}
                {report.verified && <span className="text-emerald-400">Verified</span>}
              </div>
            </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p>No road reports match your search</p>
        </div>
      )}

      <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-center text-xs text-muted-foreground">
        Road conditions change rapidly due to weather, landslides, and construction.
        Always verify with local authorities before driving high-altitude routes.
      </div>
    </div>
  );
}
