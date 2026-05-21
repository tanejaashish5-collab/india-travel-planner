"use client";

import { KEY_EVENTS, track } from "@/lib/analytics";
import { isAffiliateActive } from "@/lib/affiliate";
import { getBookingLinks } from "@/lib/booking-links";

export function BookingHandoff({
  destinationName,
  stateName,
  destinationId,
}: {
  destinationName: string;
  stateName?: string;
  /** Destination id slug — enables per-destination link overrides. */
  destinationId?: string;
}) {
  const bookingLinks = getBookingLinks({
    id: destinationId,
    name: destinationName,
    state: stateName,
  });

  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold sm:text-lg">Ready to book your stay?</h3>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            We sit before the booking layer, not beside it — compare prices on the platforms below.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-300">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Not sponsored
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {bookingLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() =>
              track(KEY_EVENTS.OUTBOUND_BOOKING_CLICK, {
                partner: link.name,
                destination: destinationName,
                state: stateName ?? "",
                affiliate_active: link.affiliate ? isAffiliateActive(link.affiliate) : false,
              })
            }
            className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${link.color}`}
          >
            {link.name} →
          </a>
        ))}
      </div>
    </div>
  );
}
