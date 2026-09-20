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
    image: '/images/markets/market-1.jpg',
    stats: ['0 HOTELS', '0 RESTAURANTS & BARS', '0 YEARS IN MARKET'],
  },
  {
    city: 'Your Market',
    heading: 'Long-Standing Experience',
    image: '/images/markets/market-2.jpg',
    stats: ['0 HOTELS', '0 RESTAURANTS & BARS', '0 YEARS IN MARKET'],
  },
  {
    city: 'Boston',
    heading: 'Long-Standing Experience',
    image: '/images/markets/boston.jpg',
    stats: ['8 HOTELS', '10 RESTAURANTS & BARS', '20 YEARS IN MARKET'],
  },
]

// 2 slides visible on large screens, 1 otherwise
function usePerView() {
  const [perView, setPerView] = useState(1)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setPerView(mq.matches ? 2 : 1)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return perView
}

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-10 w-5 sm:h-12 sm:w-6" aria-hidden="true">
    <path d={dir === 'left' ? 'M20 2 4 24l16 22' : 'M4 2l16 22L4 46'} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function MarketSlider({ slides = SLIDES, initialIndex = slides.length - 1 }) {
  const perView = usePerView()
  const [index, setIndex] = useState(initialIndex)
  const touchStart = useRef(null)
  const n = slides.length

  const prev = () => setIndex((i) => (i - 1 + n) % n)
  const next = () => setIndex((i) => (i + 1) % n)

  // First visible slide; keeps the active slide in view when showing two at once
  const start = Math.min(index, Math.max(0, n - perView))

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
        className="relative h-[440px] w-full overflow-hidden bg-black text-white sm:h-[500px] lg:h-[600px]"
      >
        {/* Track */}
        <div
          className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${start * (100 / perView)}%)` }}
        >
          {slides.map((slide, i) => {
            const active = i === index
            return (
              <div
                key={i}
                aria-hidden={!active && perView === 1}
                className="relative h-full shrink-0 basis-full overflow-hidden lg:basis-1/2"
              >
                <img
                  src={slide.image}
                  alt=""
                  draggable="false"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Dimming: darker on the non-active slide */}
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    active ? 'bg-black/30' : 'bg-black/55'
                  }`}
                />

                <div
                  className={`absolute inset-0 flex flex-col justify-center px-14 transition-opacity duration-500 sm:px-20 lg:pl-20 lg:pr-16 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em]">{slide.city}</p>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">{slide.heading}</h2>
                  <ul className="mt-8 space-y-1 text-[13px] uppercase leading-relaxed tracking-[0.1em] sm:text-sm">
                    {slide.stats.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/70 to-transparent lg:h-36" />

        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4"
        >
          <Arrow dir="left" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4"
        >
          <Arrow dir="right" />
        </button>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-1 lg:bottom-8">
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
                className={`block h-1.5 w-1.5 rounded-full transition-colors group-focus-visible:ring-2 group-focus-visible:ring-white ${
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