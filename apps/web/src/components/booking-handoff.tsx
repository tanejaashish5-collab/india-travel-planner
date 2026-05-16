"use client";

import { KEY_EVENTS, track } from "@/lib/analytics";

export function BookingHandoff({ destinationName, stateName }: { destinationName: string; stateName?: string }) {
  const searchQuery = encodeURIComponent(`${destinationName} ${stateName || "India"} hotels`);

  const bookingLinks = [
    {
      name: "MakeMyTrip",
      url: `https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(destinationName)}&checkin=&checkout=`,
      color: "text-red-400 border-red-500/30 hover:bg-red-500/10",
    },
    {
      name: "Booking.com",
      url: `https://www.booking.com/searchresults.html?ss=${searchQuery}`,
      color: "text-blue-400 border-blue-500/30 hover:bg-blue-500/10",
    },
    {
      name: "TripAdvisor",
      url: `https://www.tripadvisor.in/Search?q=${searchQuery}`,
      color: "text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10",
    },
    {
      name: "Google Hotels",
      url: `https://www.google.com/travel/hotels/${searchQuery}`,
      color: "text-slate-300 border-slate-400/30 hover:bg-slate-400/10",
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
        <span className="text-xs text-muted-foreground/50 border border-border/30 rounded-full px-2 py-0.5">Not sponsored</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {bookingLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track(KEY_EVENTS.OUTBOUND_BOOKING_CLICK, {
                partner: link.name,
                destination: destinationName,
                state: stateName ?? "",
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
