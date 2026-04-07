import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-4">
        <div className="text-8xl font-mono font-bold text-muted-foreground/20">
          404
        </div>
        <h2 className="text-2xl font-bold">Page not found</h2>
        <p className="text-muted-foreground">
          This destination doesn't exist in our database yet — or the URL is
          wrong. Try exploring from the homepage.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/en/explore"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Explore destinations
          </Link>
          <Link
            href="/en"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
