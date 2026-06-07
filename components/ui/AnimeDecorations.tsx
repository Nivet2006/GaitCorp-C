"use client";

/**
 * Site-wide floating geometric accents powered by anime.js (.anime-float, .anime-spin, etc.)
 */
export default function AnimeDecorations() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {/* Hero zone orbs */}
      <div
        data-anime-decor
        className="anime-float absolute left-[8%] top-[18%] h-24 w-24 rounded-full border border-primary/20 bg-primary/5 blur-sm"
      />
      <div
        data-anime-decor
        className="anime-float absolute right-[12%] top-[28%] h-16 w-16 rotate-45 border border-white/10 bg-white/5"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        data-anime-decor
        className="anime-spin absolute left-[15%] top-[55%] h-32 w-32 rounded-full border border-dashed border-primary/15"
      />
      <div
        data-anime-decor
        className="anime-spin-reverse absolute right-[6%] top-[45%] h-20 w-20 border border-white/5"
      />

      {/* Mid-page accents */}
      <div
        data-anime-decor
        className="anime-float absolute left-[4%] top-[72%] hidden h-2 w-2 rounded-full bg-primary lg:block"
      />
      <div
        data-anime-decor
        className="anime-glow absolute right-[20%] top-[65%] hidden h-3 w-3 rounded-full bg-primary/40 lg:block"
      />
      <div
        data-anime-decor
        className="anime-float absolute left-[45%] top-[85%] hidden h-12 w-12 rounded-lg border border-primary/10 lg:block"
      />

      {/* SVG blueprint lines */}
      <svg
        className="anime-parallax absolute -left-10 top-[40%] h-48 w-48 opacity-20"
        data-anime-depth="0.15"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          className="anime-draw"
          d="M10 100 H190 M100 10 V190 M30 30 L170 170 M170 30 L30 170"
          stroke="rgba(237,29,36,0.4)"
          strokeWidth="0.5"
        />
      </svg>

      <svg
        className="anime-parallax absolute -right-8 bottom-[20%] h-40 w-40 opacity-15"
        data-anime-depth="0.2"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle
          className="anime-draw"
          cx="100"
          cy="100"
          r="80"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.5"
        />
        <circle
          className="anime-draw"
          cx="100"
          cy="100"
          r="50"
          stroke="rgba(237,29,36,0.25)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
