import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <div className="max-w-lg text-center space-y-6">
          <div className="relative">
            <div className="text-[120px] font-mono font-black text-white/5 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl">🏔️</div>
            </div>
          </div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Lost in the mountains</h2>
          <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
            This trail doesn't exist — yet. Maybe the URL is wrong, or this destination
            hasn't been added to our database. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/en/explore"
              className="rounded-full bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-gray-200 transition-all"
            >
              Explore destinations
            </Link>
            <Link
              href="/en/plan"
              className="rounded-full border border-gray-600 px-8 py-3 text-sm font-semibold hover:bg-white/5 transition-all"
            >
              Plan a trip
            </Link>
            <Link
              href="/en"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Go home
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-600 mb-3">Popular destinations</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["manali", "leh", "rishikesh", "jaipur", "varanasi", "srinagar"].map((id) => (
                <Link
                  key={id}
                  href={`/en/destination/${id}`}
                  className="rounded-full border border-gray-700 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:border-gray-500 transition-colors capitalize"
                >
                  {id.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
