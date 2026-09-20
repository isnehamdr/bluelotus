import React, { useCallback, useEffect, useRef, useState } from 'react'

/* Sample data: replace titles and image paths with your own. */
const PARTNERS = [
  { title: 'Family Offices', image: '/images/partners/family-offices.jpg' },
  { title: 'Real Estate Investment Trusts', image: '/images/partners/reits.jpg' },
  { title: 'Private Equity', image: '/images/partners/private-equity.jpg' },
  { title: 'Institutional Investors', image: '/images/partners/institutional.jpg' },
  { title: 'Developers', image: '/images/partners/developers.jpg' },
]

const FADE = 'linear-gradient(to right, #000 82%, transparent 100%)'

export default function PartnersCarousel({
  eyebrow = 'Our Partners',
  title = 'Solutions-Oriented Results',
  items = PARTNERS,
}) {
  const scroller = useRef(null)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)
  const [atEnd, setAtEnd] = useState(true)

  const measure = useCallback(() => {
    const el = scroller.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    if (max <= 4) {
      setPages(1)
      setPage(0)
      setAtEnd(true)
      return
    }
    const count = Math.max(2, Math.ceil(el.scrollWidth / el.clientWidth))
    setPages(count)
    setPage(Math.round((el.scrollLeft / max) * (count - 1)))
    setAtEnd(el.scrollLeft >= max - 4)
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

  // Fade the trailing card out until the user reaches the end
  const maskStyle = atEnd ? undefined : { WebkitMaskImage: FADE, maskImage: FADE }

  return (
    <section className="bg-[#ebe9e4] py-14 text-[#112d5e] md:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <p className="text-sm font-medium uppercase tracking-[0.15em]">{eyebrow}</p>
        <h2 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">{title}</h2>

        {/* Scroller stays inside the content width; the next card peeks in and fades */}
        <div
          ref={scroller}
          role="region"
          aria-label={title}
          tabIndex={0}
          style={maskStyle}
          className="mt-8 flex snap-x snap-mandatory gap-2.5 overflow-x-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#112d5e]/40 md:mt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <figure key={item.title} className="shrink-0 basis-[80%] snap-start sm:basis-[46%] lg:basis-[42%]">
              <div className="aspect-[7/5] w-full overflow-hidden bg-[#d9d6cf]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  draggable="false"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] sm:text-[13px]">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>

        {pages > 1 && (
          <div className="mt-6 flex items-center justify-center md:mt-8">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide group ${i + 1}`}
                aria-current={i === page}
                onClick={() => goTo(i)}
                className="group p-2 focus:outline-none"
              >
                <span
                  className={`block h-1.5 w-1.5 rounded-full transition-colors group-focus-visible:ring-2 group-focus-visible:ring-[#112d5e] ${
                    i === page ? 'bg-[#112d5e]' : 'bg-[#8b93a8] group-hover:bg-[#5b6690]'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}