import React, { useCallback, useEffect, useRef, useState } from 'react'

/* Sample data: replace titles and image paths with your own. */
const DESTINATIONS = [
  { title: 'Urban City Centers', image: '/images/destinations/urban.jpg' },
  { title: 'Mountain Leisure', image: '/images/destinations/mountain.jpg' },
  { title: 'Beach Getaways', image: '/images/destinations/beach.jpg' },
  { title: 'Wine Country', image: '/images/destinations/wine.jpg' },
  { title: 'Lakefront Retreats', image: '/images/destinations/lake.jpg' },
]

export default function DestinationExpertise() {
  const scroller = useRef(null)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)

  const measure = useCallback(() => {
    const el = scroller.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    if (max <= 4) {
      setPages(1)
      setPage(0)
      return
    }
    const count = Math.max(2, Math.ceil(el.scrollWidth / el.clientWidth))
    setPages(count)
    setPage(Math.round((el.scrollLeft / max) * (count - 1)))
  }, [])

  useEffect(() => {
    measure()
    const el = scroller.current
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [measure])

  const goTo = (i) => {
    const el = scroller.current
    const max = el.scrollWidth - el.clientWidth
    el.scrollTo({ left: (max * i) / (pages - 1), behavior: 'smooth' })
  }

  return (
    <section className="bg-[#ebe9e4] py-14 text-[#112d5e] [--pad:1.5rem] sm:[--pad:2.5rem] md:py-20 lg:[--pad:4rem]">
      <div className="mx-auto max-w-7xl px-[var(--pad)]">
        <p className="text-sm font-medium uppercase tracking-[0.15em]">Diverse Market Experience</p>
        <h2 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">Destination Expertise</h2>
      </div>

      {/* Carousel: starts aligned with the page content, bleeds off the right edge */}
      <div
        ref={scroller}
        role="region"
        aria-label="Destination types"
        tabIndex={0}
        style={{
          paddingLeft: 'max(var(--pad), calc((100vw - 80rem) / 2 + var(--pad)))',
          scrollPaddingLeft: 'max(var(--pad), calc((100vw - 80rem) / 2 + var(--pad)))',
        }}
        className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pr-[var(--pad)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#112d5e]/40 md:mt-10 md:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {DESTINATIONS.map((d) => (
          <figure key={d.title} className="w-[78vw] shrink-0 snap-start sm:w-[340px] lg:w-[400px] xl:w-[420px]">
            <div className="aspect-[6/5] w-full overflow-hidden bg-[#d9d6cf]">
              <img src={d.image} alt={d.title} loading="lazy" draggable="false" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-4 text-sm font-semibold uppercase tracking-[0.1em]">{d.title}</figcaption>
          </figure>
        ))}
      </div>

      {/* Dots */}
      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2.5 md:mt-10">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide group ${i + 1}`}
              aria-current={i === page}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#112d5e] ${
                i === page ? 'bg-[#112d5e]' : 'bg-[#8b93a8] hover:bg-[#5b6690]'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}