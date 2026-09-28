import React, { useEffect, useRef, useState } from 'react'

/*
  Sample data: replace with your own markets and images.
  Order matters: the slider opens on the LAST slide by default (as in the design),
  change `initialIndex` to 0 if you want it to open on the first.
*/
const SLIDES = [
  {
    city: 'Your Market',
    heading: 'Long-Standing Experience',
    image: '/images/img2.jpg',
    stats: ['0 HOTELS', '0 RESTAURANTS & BARS', '0 YEARS IN MARKET'],
  },
  {
    city: 'Your Market',
    heading: 'Long-Standing Experience',
    image: '/images/img3.jpg',
    stats: ['0 HOTELS', '0 RESTAURANTS & BARS', '0 YEARS IN MARKET'],
  },
  {
    city: 'Boston',
    heading: 'Long-Standing Experience',
    image: '/images/img4.jpg',
    stats: ['8 HOTELS', '10 RESTAURANTS & BARS', '20 YEARS IN MARKET'],
  },
]

const Arrow = ({ dir }) => (
  <svg
    viewBox="0 0 24 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    className="h-9 w-4 sm:h-11 sm:w-5 lg:h-12 lg:w-6"
    aria-hidden="true"
  >
    <path
      d={dir === 'left' ? 'M20 2 4 24l16 22' : 'M4 2l16 22L4 46'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function MarketSlider({ slides = SLIDES, initialIndex = slides.length - 1 }) {
  const [index, setIndex] = useState(initialIndex)
  const touchStart = useRef(null)
  const n = slides.length

  const prev = () => setIndex((i) => (i - 1 + n) % n)
  const next = () => setIndex((i) => (i + 1) % n)

  const onTouchStart = (e) => (touchStart.current = e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    touchStart.current = null
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
  }

  return (
    <section className="bg-[#ebe9e4] py-6 md:py-8 lg:py-10">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Market highlights"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') prev()
          if (e.key === 'ArrowRight') next()
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative h-[560px] w-full overflow-hidden bg-black text-white sm:h-[520px] md:h-[560px] lg:h-[640px] xl:h-[700px]"
      >
        {/* Track: one slide at a time, full width */}
        <div
          className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => {
            const active = i === index
            return (
              <div
                key={i}
                aria-hidden={!active}
                className="relative h-full w-full shrink-0 basis-full overflow-hidden"
              >
                <img
                  src={slide.image}
                  alt=""
                  draggable="false"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/35" />

                {/* Text content — responsive sizes and padding */}
                <div
                  className={`absolute inset-0 flex flex-col justify-center px-8 transition-opacity duration-500 sm:px-12 md:px-16 lg:px-20 xl:px-28 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="max-w-md sm:max-w-lg lg:max-w-xl">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] sm:text-xs md:text-sm lg:text-base">
                      {slide.city}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem]">
                      {slide.heading}
                    </h2>
                    <ul className="mt-6 space-y-1.5 text-xs uppercase leading-relaxed tracking-[0.12em] sm:mt-8 sm:text-sm md:text-[15px] lg:text-base lg:tracking-[0.14em]">
                      {slide.stats.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/70 to-transparent sm:h-28 lg:h-36" />

        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 lg:left-6"
        >
          <Arrow dir="left" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 lg:right-6"
        >
          <Arrow dir="right" />
        </button>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-1.5 sm:bottom-6 lg:bottom-8">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="group p-1.5 focus:outline-none"
            >
              <span
                className={`block h-1.5 w-1.5 rounded-full transition-colors group-focus-visible:ring-2 group-focus-visible:ring-white sm:h-2 sm:w-2 ${
                  i === index ? 'bg-white' : 'bg-white/40 group-hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}