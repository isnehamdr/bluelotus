import React, { useEffect, useState } from 'react'

// Replace src values with your own images (e.g. /images/hero-1.jpg)
const SLIDES = [
  { src: '/images/hero-1.jpg', caption: 'Hotel One, City, ST' },
  { src: '/images/hero-2.jpg', caption: 'Hotel Two, City, ST' },
  { src: '/images/hero-3.jpg', caption: 'The Rittenhouse, Philadelphia, PA' },
  { src: '/images/hero-4.jpg', caption: 'Hotel Four, City, ST' },
  { src: '/images/hero-5.jpg', caption: 'Hotel Five, City, ST' },
]

const INTERVAL_MS = 6000

// H over M monogram, drawn as SVG so it scales cleanly
function HMMark({ className = '' }) {
  return (
    <svg
      viewBox="0 0 216 216"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      className={className}
      role="img"
      aria-label="HM Hotels"
    >
      {/* outer verticals */}
      <path d="M3.5 0V216M212.5 0V216" />
      {/* top H */}
      <path d="M41 0V87M176 0V87M41 43H176" />
      {/* middle divider */}
      <path d="M0 100H216" />
      {/* bottom M */}
      <path d="M41 216V142L108.5 202L176 142V216" strokeLinejoin="miter" />
    </svg>
  )
}

export default function Hero() {
  const [active, setActive] = useState(2)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [active])

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-slate-900 text-white">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.caption}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Center: logo, dots, wordmark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-8">
        <HMMark className="h-28 w-28 sm:h-36 sm:w-36 lg:h-[215px] lg:w-[215px]" />

        <div className="mt-8 flex items-center gap-[14px] lg:mt-10" role="tablist" aria-label="Hero slides">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-[13px] w-[13px] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                i === active ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        <p className="mt-4 text-[44px] font-light leading-none tracking-[0.12em] sm:text-[52px] lg:text-[56px]">
          HOTELS
        </p>
      </div>

      {/* Caption: centered on small screens, bottom-right on large */}
      <p
        key={active}
        className="absolute inset-x-0 bottom-6 px-6 text-center text-sm font-medium text-white/90 lg:inset-x-auto lg:bottom-9 lg:right-[190px] lg:px-0 lg:text-left lg:text-base"
      >
        {SLIDES[active].caption}
      </p>
    </section>
  )
}