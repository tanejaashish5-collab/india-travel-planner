// Removed AnimatePresence page transition — it forced remount on every nav
// (including browser back), defeated bfcache, and blocked for exit animation.
// Instant nav via browser bfcache is much better UX.

export function PageTransition({ children }: { children: React.ReactNode }) {
  return <div id="main-content">{children}</div>;
}
