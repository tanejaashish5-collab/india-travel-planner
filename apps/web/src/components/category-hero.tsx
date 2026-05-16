import Image from "next/image";

/**
 * Reusable hero block for category landing pages (`/treks`, `/festivals`,
 * `/camping`, etc.). Plays a looping cinematic video with a static image as
 * the poster fallback. Mirrors the visual rhythm of the state-page hero so
 * category landings feel like part of the same magazine.
 */
export function CategoryHero({
  videoSrc: src,
  posterSrc,
  posterAlt,
  kicker,
  title,
  subtitle,
}: {
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative h-56 sm:h-72 lg:h-[28rem] overflow-hidden">
      {src ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <Image src={posterSrc} alt={posterAlt} fill sizes="100vw" priority className="object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
        <div className="mx-auto max-w-7xl">
          {kicker && (
            <p className="text-xs sm:text-sm font-medium text-primary uppercase tracking-[0.08em] mb-2">
              {kicker}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-white/85 max-w-2xl text-sm sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
