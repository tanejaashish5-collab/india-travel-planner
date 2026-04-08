import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="flex items-center justify-center px-4 py-24">
        <div className="max-w-lg text-center space-y-6">
          <div className="relative">
            <div className="text-[120px] font-mono font-black text-muted-foreground/10 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl">🏔️</div>
            </div>
          </div>
          <h2 className="text-3xl font-bold">Lost in the mountains</h2>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
            This trail doesn't exist — yet. Maybe the URL is wrong, or this destination
            hasn't been added to our database. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/en/explore"
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore destinations
            </Link>
            <Link
              href="/en/plan"
              className="rounded-full border border-border px-8 py-3 text-sm font-semibold hover:bg-muted hover:-translate-y-0.5 transition-all duration-200"
            >
              Plan a trip
            </Link>
            <Link
              href="/en"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Go home
            </Link>
          </div>

          {/* Suggested destinations */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-3">Popular destinations</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["manali", "leh", "rishikesh", "jaipur", "varanasi", "srinagar"].map((id) => (
                <Link
                  key={id}
                  href={`/en/destination/${id}`}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors capitalize"
                >
                  {id.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
