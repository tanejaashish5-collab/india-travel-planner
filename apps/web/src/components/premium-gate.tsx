"use client";

import { isFeatureGated, type PremiumFeature } from "@/lib/premium";

export function PremiumGate({
  feature,
  children,
  preview,
}: {
  feature: PremiumFeature;
  children: React.ReactNode;
  preview?: React.ReactNode;
}) {
  if (!isFeatureGated(feature)) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Preview content (blurred) */}
      {preview && (
        <div className="blur-sm pointer-events-none select-none" aria-hidden>
          {preview}
        </div>
      )}
      {/* Upgrade prompt */}
      <div className={`${preview ? "absolute inset-0 flex items-center justify-center" : ""}`}>
        <div className="rounded-2xl border border-primary/20 bg-card/95 backdrop-blur-md p-6 text-center max-w-sm mx-auto shadow-xl">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-lg font-bold mb-2">Premium Feature</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This feature is part of the premium plan. Upgrade to unlock full access.
          </p>
          <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
