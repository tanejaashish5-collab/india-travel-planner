"use client";

import { KEY_EVENTS, track } from "@/lib/analytics";
import { buildAffiliateUrl, isAffiliateActive, type TaggablePartner } from "@/lib/affiliate";

type BookingLink = { name: string; url: string; color: string; affiliate?: TaggablePartner };

export function BookingHandoff({ destinationName, stateName }: { destinationName: string; stateName?: string }) {
  const searchQuery = encodeURIComponent(`${destinationName} ${stateName || "India"} hotels`);
  // Agoda has no free-text search deep-link (textToSearch dumps to the
  // homepage) — but its per-city pages resolve reliably, including offbeat
  // towns like Tosh: /city/<slug>-in.html. Slug = the destination name with
  // alt-name parens dropped and non-alphanumerics hyphenated.
  const agodaSlug = destinationName
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // `affiliate` routes a link through buildAffiliateUrl — a no-op until the
  // partner's affiliate ID env var is set, then tagged on the next deploy.
  // Booking.com (aid) and Agoda (cid) are the two with affiliate programs.
  const bookingLinks: BookingLink[] = [
    {
      name: "MakeMyTrip",
      url: `https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(destinationName)}&checkin=&checkout=`,
      color: "text-red-400 border-red-500/30 hover:bg-red-500/10",
    },
    {
      name: "Booking.com",
      url: `https://www.booking.com/searchresults.html?ss=${searchQuery}`,
      color: "text-blue-400 border-blue-500/30 hover:bg-blue-500/10",
      affiliate: "booking",
    },
    {
      name: "TripAdvisor",
      url: `https://www.tripadvisor.in/Search?q=${searchQuery}`,
      color: "text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10",
    },
    {
      name: "Agoda",
      url: `https://www.agoda.com/city/${agodaSlug}-in.html`,
      color: "text-violet-300 border-violet-500/30 hover:bg-violet-500/10",
      affiliate: "agoda",
    },
  ];

  return (
    <div className="rounded-xl border border-border/50 bg-muted/10 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold">Ready to book?</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            We sit before the booking layer, not beside it. Compare prices on the platforms below once you&apos;ve decided where to go.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 shrink-0 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-300">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Not sponsored
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {bookingLinks.map((link) => (
          <a
            key={link.name}
            href={link.affiliate ? buildAffiliateUrl(link.affiliate, link.url) : link.url}
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
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${link.color}`}
          >
            {link.name} →
          </a>
        ))}
      </div>
    </div>
  );
}
