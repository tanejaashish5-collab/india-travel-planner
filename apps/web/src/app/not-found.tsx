import Image from "next/image";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: system-ui, -apple-system, sans-serif; min-height: 100vh; background: #161614; color: #F5F1E8; }
          a { color: inherit; text-decoration: none; }
          .nf-header { border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(22,22,20,0.9); backdrop-filter: blur(16px); }
          .nf-header-inner { max-width: 80rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; }
          .nf-logo { display: flex; align-items: center; gap: 0.5rem; }
          .nf-logo-icon { display: flex; height: 2rem; width: 2rem; align-items: center; justify-content: center; border-radius: 0.5rem; border: 1px solid rgba(245,241,232,0.2); background: #161614; font-size: 0.875rem; font-weight: 700; color: #F5F1E8; }
          .nf-logo-icon .accent { color: #E55642; }
          .nf-logo-text { font-size: 1.125rem; font-weight: 700; }
          .nf-nav { display: flex; align-items: center; gap: 0.25rem; }
          .nf-nav a { border-radius: 0.5rem; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #888; transition: all 0.2s; }
          .nf-nav a:hover { color: #fff; background: rgba(255,255,255,0.05); }
          .nf-nav .nf-cta { margin-left: 0.5rem; background: #F5F1E8; color: #161614; padding: 0.375rem 0.75rem; font-weight: 500; border-radius: 0.5rem; }
          .nf-nav .nf-cta:hover { background: #ddd; }
          .nf-hero { position: relative; display: flex; align-items: center; justify-content: center; padding: 6rem 1rem; min-height: 80vh; }
          .nf-hero-bg { position: absolute; inset: 0; overflow: hidden; }
          .nf-hero-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.08; }
          .nf-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #161614, rgba(22,22,20,0.8), transparent); }
          .nf-content { position: relative; max-width: 32rem; text-align: center; }
          .nf-404-bg { font-size: 140px; font-family: monospace; font-weight: 900; color: rgba(255,255,255,0.03); line-height: 1; user-select: none; }
          .nf-emoji { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 3.5rem; }
          .nf-title { font-size: 2rem; font-weight: 700; font-family: Georgia, serif; margin-top: 1.5rem; }
          .nf-desc { color: #888; font-size: 1.125rem; line-height: 1.6; max-width: 28rem; margin: 1rem auto 0; }
          .nf-buttons { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.75rem; margin-top: 2rem; }
          .nf-btn-primary { border-radius: 9999px; background: #F5F1E8; color: #161614; padding: 0.875rem 2rem; font-size: 0.875rem; font-weight: 600; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
          .nf-btn-primary:hover { background: #fff; }
          .nf-btn-secondary { border-radius: 9999px; border: 1px solid #555; padding: 0.875rem 2rem; font-size: 0.875rem; font-weight: 600; transition: all 0.2s; }
          .nf-btn-secondary:hover { background: rgba(255,255,255,0.05); }
          .nf-suggestions { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); }
          .nf-suggestions p { font-size: 0.875rem; color: #666; margin-bottom: 1rem; }
          .nf-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
          .nf-pill { border-radius: 9999px; border: 1px solid rgba(255,255,255,0.1); padding: 0.5rem 1rem; font-size: 0.875rem; color: #888; text-transform: capitalize; transition: all 0.2s; }
          .nf-pill:hover { color: #fff; border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }
          @media (min-width: 640px) { .nf-title { font-size: 2.5rem; } }
        `}</style>
      </head>
      <body>
        {/* Branded header */}
        <header className="nf-header">
          <div className="nf-header-inner">
            <Link href="/en" className="nf-logo">
              <div className="nf-logo-icon">
                N<span className="accent">.</span>
              </div>
              <span className="nf-logo-text">NakshIQ</span>
            </Link>
            <div className="nf-nav">
              <Link href="/en/explore">Explore</Link>
              <Link href="/en/plan" className="nf-cta">AI Plan</Link>
            </div>
          </div>
        </header>

        {/* Hero 404 with background */}
        <div className="nf-hero">
          <div className="nf-hero-bg">
            <Image src="/images/destinations/spiti-valley.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.08 }} />
            <div className="nf-hero-overlay" />
          </div>

          <div className="nf-content">
            <div style={{ position: "relative" }}>
              <div className="nf-404-bg">404</div>
              <div className="nf-emoji">🏔️</div>
            </div>
            <h2 className="nf-title">Lost in the mountains</h2>
            <p className="nf-desc">
              This trail doesn&apos;t exist — yet. Maybe the URL is wrong, or this destination
              hasn&apos;t been added to our database.
            </p>
            <div className="nf-buttons">
              <Link href="/en/explore" className="nf-btn-primary">
                Explore Destinations
              </Link>
              <Link href="/en/plan" className="nf-btn-secondary">
                Plan a Trip
              </Link>
            </div>

            {/* Popular destinations */}
            <div className="nf-suggestions">
              <p>Try these instead</p>
              <div className="nf-pills">
                {["manali", "leh", "rishikesh", "jaipur", "varanasi", "srinagar", "spiti-valley", "udaipur"].map((id) => (
                  <Link key={id} href={`/en/destination/${id}`} className="nf-pill">
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
