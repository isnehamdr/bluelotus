import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

const DESTINATIONS = [
  { title: 'Best Western Plus Kathmandu Hotel, Gaushala, Kathmandu', image: '/images/exp1.jpg' },
  { title: 'Best Western Siraichuli Hotel, Bharatpur, Chitwan', image: '/images/exp2.jpg' },
  { title: 'Manigram Bishram Batika, Manigram', image: '/images/exp3.webp' },
  { title: 'River Bank Jungle Resort, Chitwan', image: '/images/exp4.jpg' },
]

// How many cards are visible at once (fractions let the next card peek in)
function getVisibleCards(width) {
  if (width < 480) return 1.1
  if (width < 640) return 1.35
  if (width < 1024) return 1.85
  if (width < 1280) return 2.25
  return 2.5
}

// Auto-scroll speed in pixels per second (slower on small screens)
function getSpeed(width) {
  if (width < 640) return 20
  if (width < 1024) return 28
  return 35
}

const RESUME_DELAY = 2000

function Card({ d, index, clone = false }) {
  const dataProps = {}
  if (index === 0) {
    dataProps[clone ? 'data-first-clone' : 'data-first-original'] = 'true'
  }

  return (
    <figure
      {...dataProps}
      aria-hidden={clone ? 'true' : undefined}
      style={{ width: 'var(--card-w, 80vw)' }}
      className="shrink-0 select-none"
    >
      <div className="aspect-[3/2] w-full overflow-hidden bg-[#d9d6cf]">
        <img
          src={d.image}
          alt={clone ? '' : d.title}
          loading={!clone && index === 0 ? 'eager' : 'lazy'}
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          className="pointer-events-none h-full w-full select-none object-cover"
        />
      </div>

      <figcaption className="mt-3 text-[11px] font-semibold uppercase leading-snug tracking-[0.08em] sm:mt-4 sm:text-xs sm:tracking-[0.1em] lg:text-sm">
        {d.title}
      </figcaption>
    </figure>
  )
}

export default function DestinationExpertise() {
  const scroller = useRef(null)

  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)

  const animationRef = useRef(null)
  const resumeTimerRef = useRef(null)
  const pausedRef = useRef(false)
  const lastTimeRef = useRef(0)
  const posRef = useRef(0) // exact (fractional) scroll position

  /* ---------------- Card width ---------------- */

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

  /* ---------------- Width of one full loop ---------------- */

  const getLoopWidth = useCallback(() => {
    const el = scroller.current
    if (!el) return 0

    const first = el.querySelector('[data-first-original]')
    const clone = el.querySelector('[data-first-clone]')
    if (!first || !clone) return 0

    return clone.offsetLeft - first.offsetLeft
  }, [])

  /* ---------------- Measure ---------------- */

  const measure = useCallback(() => {
    const el = scroller.current
    if (!el) return

    sizeCards()

    const loopWidth = getLoopWidth()

    if (!loopWidth) {
      setPages(1)
      setPage(0)
      return
    }

    const count = Math.max(2, Math.ceil(loopWidth / el.clientWidth))
    setPages(count)

    const position = el.scrollLeft % loopWidth
    const currentPage = Math.round((position / loopWidth) * (count - 1))
    setPage(Math.min(Math.max(currentPage, 0), count - 1))
  }, [sizeCards, getLoopWidth])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  /* ---------------- Resize ---------------- */

  useEffect(() => {
    const el = scroller.current
    if (!el) return

    const resizeObserver = new ResizeObserver(() => measure())
    resizeObserver.observe(el)
    window.addEventListener('resize', measure)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  /* ---------------- Pagination while scrolling ---------------- */

  useEffect(() => {
    const el = scroller.current
    if (!el) return

    let frame = null

    const handleScroll = () => {
      if (frame) cancelAnimationFrame(frame)

      frame = requestAnimationFrame(() => {
        const loopWidth = getLoopWidth()
        if (!loopWidth) return

        const position = el.scrollLeft % loopWidth
        const currentPage = Math.round(
          (position / loopWidth) * Math.max(pages - 1, 1)
        )
        setPage(Math.min(Math.max(currentPage, 0), pages - 1))
      })
    }

    el.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      el.removeEventListener('scroll', handleScroll)
    }
  }, [pages, getLoopWidth])

  /* ---------------- Auto scroll ---------------- */

  useEffect(() => {
    const el = scroller.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    posRef.current = el.scrollLeft

    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time

      // Clamp delta so a background tab doesn't cause a big jump
      const delta = Math.min(time - lastTimeRef.current, 100)
      lastTimeRef.current = time

      // If the user (or smooth scrollTo / touch momentum) moved the scroller, follow it
      if (pausedRef.current || Math.abs(el.scrollLeft - posRef.current) > 2) {
        posRef.current = el.scrollLeft
      }

      if (!pausedRef.current) {
        const loopWidth = getLoopWidth()

        if (loopWidth > 0) {
          posRef.current += getSpeed(window.innerWidth) * (delta / 1000)

          if (posRef.current >= loopWidth) {
            posRef.current -= loopWidth
          }

          el.scrollLeft = posRef.current
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      lastTimeRef.current = 0
    }
  }, [getLoopWidth])

  /* ---------------- Pause + resume ---------------- */

  const pauseAndResume = useCallback(() => {
    pausedRef.current = true

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)

    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false
    }, RESUME_DELAY)
  }, [])

  /* ---------------- User interaction ---------------- */

  useEffect(() => {
    const el = scroller.current
    if (!el) return

    const handleInteract = () => pauseAndResume()
    const handleMouseEnter = () => {
      pausedRef.current = true
    }
    const handleMouseLeave = () => {
      pausedRef.current = false
    }

    el.addEventListener('wheel', handleInteract, { passive: true })
    el.addEventListener('touchstart', handleInteract, { passive: true })
    el.addEventListener('touchmove', handleInteract, { passive: true })
    el.addEventListener('pointerdown', handleInteract, { passive: true })
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('wheel', handleInteract)
      el.removeEventListener('touchstart', handleInteract)
      el.removeEventListener('touchmove', handleInteract)
      el.removeEventListener('pointerdown', handleInteract)
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)

      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [pauseAndResume])

  /* ---------------- Pagination click ---------------- */

  const goTo = (i) => {
    const el = scroller.current
    if (!el) return

    const loopWidth = getLoopWidth()
    if (!loopWidth) return

    pauseAndResume()

    const target = (loopWidth * i) / Math.max(pages - 1, 1)

    el.scrollTo({ left: target, behavior: 'smooth' })
  }

  /* ---------------- Render ---------------- */

  return (
    <section className="bg-[#ebe9e4] py-14 text-[#001a44] [--pad:1.25rem] sm:[--pad:2.5rem] md:py-20 lg:[--pad:4rem]">
      <div className="mx-auto max-w-7xl px-[var(--pad)]">
        <p className="text-xs font-medium uppercase tracking-[0.15em] sm:text-sm">
          Diverse Market Experience
        </p>

        <h2 className="mt-3 text-xl font-semibold leading-snug sm:mt-4 sm:text-2xl md:text-3xl lg:text-4xl">
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
        className="relative mt-8 flex gap-3 overflow-x-auto overscroll-x-contain pr-[var(--pad)] touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] sm:gap-4 md:mt-10"
      >
        {/* Original cards */}
        {DESTINATIONS.map((d, index) => (
          <Card key={`original-${index}`} d={d} index={index} />
        ))}

        {/* Cloned cards (for the seamless loop) */}
        {DESTINATIONS.map((d, index) => (
          <Card key={`clone-${index}`} d={d} index={index} clone />
        ))}
      </div>

      {/* Pagination */}
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
                i === page
                  ? 'bg-[#001a44]'
                  : 'bg-[#8b93a8] hover:bg-[#5b6690]'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}