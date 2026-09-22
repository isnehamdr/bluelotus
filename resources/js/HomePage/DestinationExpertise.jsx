import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const DESTINATIONS = [
  { title: 'Urban City Centers', image: '/images/pic1.jpg' },
  { title: 'Mountain Leisure', image: '/images/pic2.jpg' },
  { title: 'Beach Getaways', image: '/images/pic3.jpg' },
]

function getVisibleCards(width) {
  if (width < 640) return 1.15
  if (width < 1024) return 1.75
  return 2.25
}

export default function DestinationExpertise() {
  const scroller = useRef(null)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)

  const sizeCards = useCallback(() => {
    const el = scroller.current
    if (!el) return

    const styles = getComputedStyle(el)
    const paddingLeft = parseFloat(styles.paddingLeft) || 0
    const paddingRight = parseFloat(styles.paddingRight) || 0
    const gap = parseFloat(styles.columnGap || styles.gap) || 0

    const availableWidth = el.clientWidth - paddingLeft - paddingRight
    const visible = getVisibleCards(window.innerWidth)
    const cardWidth = (availableWidth - gap * Math.floor(visible)) / visible

    el.style.setProperty('--card-w', `${Math.max(cardWidth, 200)}px`)
  }, [])

  const measure = useCallback(() => {
    const el = scroller.current
    if (!el) return
    sizeCards()

    const max = el.scrollWidth - el.clientWidth
    if (max <= 4) {
      setPages(1)
      setPage(0)
      return
    }
    const count = Math.max(2, Math.ceil(el.scrollWidth / el.clientWidth))
    setPages(count)
    setPage(Math.round((el.scrollLeft / max) * (count - 1)))
  }, [sizeCards])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const goTo = (i) => {
    const el = scroller.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    el.scrollTo({ left: (max * i) / Math.max(pages - 1, 1), behavior: 'smooth' })
  }

  return (
    <section className="bg-[#ebe9e4] py-14 text-[#001a44] [--pad:1.25rem] sm:[--pad:2.5rem] md:py-20 lg:[--pad:4rem]">
      <div className="mx-auto max-w-7xl px-[var(--pad)]">
        <p className="text-xs font-medium uppercase tracking-[0.15em] sm:text-sm">
          Diverse Market Experience
        </p>
        <h2 className="mt-3 text-xl font-semibold leading-snug sm:mt-4 sm:text-2xl md:text-3xl">
          Destination Expertise
        </h2>
      </div>

      <div
        ref={scroller}
        role="region"
        aria-label="Destination types"
        style={{
          paddingLeft: 'max(var(--pad), calc((100vw - 80rem) / 2 + var(--pad)))',
          scrollPaddingLeft: 'max(var(--pad), calc((100vw - 80rem) / 2 + var(--pad)))',
        }}
        className="
          mt-8 flex gap-3 overflow-x-auto pr-[var(--pad)]
          snap-x snap-proximity
          overscroll-x-contain
          touch-pan-x touch-pan-y
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          [-webkit-overflow-scrolling:touch]
          sm:gap-4 md:mt-10
        "
      >
        {DESTINATIONS.map((d) => (
          <figure
            key={d.title}
            style={{ width: 'var(--card-w, 80vw)' }}
            className="shrink-0 snap-start select-none"
          >
            <div className="aspect-[3/2] w-full overflow-hidden bg-[#d9d6cf]">
              <img
                src={d.image}
                alt={d.title}
                loading="lazy"
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
                className="pointer-events-none h-full w-full select-none object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] sm:mt-4 sm:text-sm">
              {d.title}
            </figcaption>
          </figure>
        ))}
      </div>

      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2.5 md:mt-10">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide group ${i + 1}`}
              aria-current={i === page}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === page ? 'bg-[#001a44]' : 'bg-[#8b93a8] hover:bg-[#5b6690]'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}