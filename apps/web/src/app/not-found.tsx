import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#161614] text-[#F5F1E8]">
        {/* Branded header */}
        <header className="border-b border-white/10 bg-[#161614]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/en" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#161614] border border-[#F5F1E8]/20 text-sm font-bold text-[#F5F1E8]">
                N<span className="text-[#E55642]">.</span>
              </div>
              <span className="text-lg font-bold">NakshIQ</span>
            </Link>
            <div className="flex items-center gap-1">
              <Link href="/en/explore" className="rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">Explore</Link>
              <Link href="/en/collections" className="rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all hidden sm:block">Collections</Link>
              <Link href="/en/plan" className="ml-2 rounded-lg bg-[#F5F1E8] px-3 py-1.5 text-sm font-medium text-[#161614] hover:bg-gray-300 transition-all">AI Plan</Link>
            </div>
          </div>
        </header>

        {/* Hero 404 with background */}
        <div className="relative flex items-center justify-center px-4 py-24 min-h-[80vh]">
          {/* Background image */}
          <div className="absolute inset-0">
            <img src="/images/destinations/spiti-valley.jpg" alt="" className="w-full h-full object-cover opacity-[0.08]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161614] via-[#161614]/80 to-transparent" />
          </div>

          <div className="relative max-w-lg text-center space-y-6">
            <div className="relative">
              <div className="text-[140px] font-mono font-black text-white/[0.03] leading-none select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">🏔️</div>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
              Lost in the mountains
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
              This trail doesn't exist — yet. Maybe the URL is wrong, or this destination
              hasn't been added to our database.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/en/explore"
                className="rounded-full bg-[#F5F1E8] text-[#161614] px-8 py-3.5 text-sm font-semibold hover:bg-white transition-all shadow-lg"
              >
                Explore Destinations
              </Link>
              <Link
                href="/en/plan"
                className="rounded-full border border-gray-600 px-8 py-3.5 text-sm font-semibold hover:bg-white/5 transition-all"
              >
                Plan a Trip
              </Link>
            </div>

            {/* Popular destinations */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-gray-500 mb-4">Try these instead</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["manali", "leh", "rishikesh", "jaipur", "varanasi", "srinagar", "spiti-valley", "udaipur"].map((id) => (
                  <Link
                    key={id}
                    href={`/en/destination/${id}`}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all capitalize"
                  >
                    {id.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
