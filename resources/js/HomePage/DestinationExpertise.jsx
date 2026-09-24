import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

const DESTINATIONS = [
  { title: 'Urban City Centers', image: '/images/d1.jpg' },
  { title: 'Mountain Leisure', image: '/images/d2.jpg' },
  { title: 'Beach Getaways', image: '/images/d3.jpg' },
  { title: 'Urban City Centers', image: '/images/d4.jpg' },
  { title: 'Mountain Leisure', image: '/images/d5.jpg' },
]

function getVisibleCards(width) {
  if (width < 640) return 1.15
  if (width < 1024) return 1.75
  return 2.25
}

const AUTO_SCROLL_SPEED = 2
const RESUME_DELAY = 2000

export default function DestinationExpertise() {
  const scroller = useRef(null)

  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)

  const animationRef = useRef(null)
  const resumeTimerRef = useRef(null)

  const pausedRef = useRef(false)
  const lastTimeRef = useRef(0)

  /*
   * ----------------------------------------------------
   * RESPONSIVE CARD WIDTH
   * ----------------------------------------------------
   */

  const sizeCards = useCallback(() => {
    const el = scroller.current

    if (!el) return

    const styles = getComputedStyle(el)

    const paddingLeft =
      parseFloat(styles.paddingLeft) || 0

    const paddingRight =
      parseFloat(styles.paddingRight) || 0

    const gap =
      parseFloat(styles.columnGap || styles.gap) || 0

    const availableWidth =
      el.clientWidth -
      paddingLeft -
      paddingRight

    const visible = getVisibleCards(
      window.innerWidth
    )

    const cardWidth =
      (availableWidth -
        gap * Math.floor(visible)) /
      visible

    el.style.setProperty(
      '--card-w',
      `${Math.max(cardWidth, 200)}px`
    )
  }, [])

  /*
   * ----------------------------------------------------
   * GET LOOP WIDTH
   * ----------------------------------------------------
   */

  const getLoopWidth = useCallback(() => {
    const el = scroller.current

    if (!el) return 0

    const clone =
      el.querySelector('[data-first-clone]')

    if (!clone) return 0

    return clone.offsetLeft
  }, [])

  /*
   * ----------------------------------------------------
   * MEASURE
   * ----------------------------------------------------
   */

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

    const count = Math.max(
      2,
      Math.ceil(
        loopWidth / el.clientWidth
      )
    )

    setPages(count)

    const currentPosition =
      el.scrollLeft % loopWidth

    const currentPage = Math.round(
      (currentPosition / loopWidth) *
        (count - 1)
    )

    setPage(
      Math.min(
        Math.max(currentPage, 0),
        count - 1
      )
    )
  }, [sizeCards, getLoopWidth])

  /*
   * ----------------------------------------------------
   * INITIAL MEASURE
   * ----------------------------------------------------
   */

  useLayoutEffect(() => {
    measure()
  }, [measure])

  /*
   * ----------------------------------------------------
   * RESIZE
   * ----------------------------------------------------
   */

  useEffect(() => {
    const el = scroller.current

    if (!el) return

    const resizeObserver =
      new ResizeObserver(() => {
        measure()
      })

    resizeObserver.observe(el)

    window.addEventListener(
      'resize',
      measure
    )

    return () => {
      resizeObserver.disconnect()

      window.removeEventListener(
        'resize',
        measure
      )
    }
  }, [measure])

  /*
   * ----------------------------------------------------
   * UPDATE PAGINATION WHILE SCROLLING
   * ----------------------------------------------------
   */

  useEffect(() => {
    const el = scroller.current

    if (!el) return

    let frame = null

    const handleScroll = () => {
      if (frame) {
        cancelAnimationFrame(frame)
      }

      frame = requestAnimationFrame(() => {
        const loopWidth = getLoopWidth()

        if (!loopWidth) return

        const position =
          el.scrollLeft % loopWidth

        const currentPage = Math.round(
          (position / loopWidth) *
            Math.max(pages - 1, 1)
        )

        setPage(
          Math.min(
            Math.max(currentPage, 0),
            pages - 1
          )
        )
      })
    }

    el.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    return () => {
      if (frame) {
        cancelAnimationFrame(frame)
      }

      el.removeEventListener(
        'scroll',
        handleScroll
      )
    }
  }, [pages, getLoopWidth])

  /*
   * ----------------------------------------------------
   * AUTO SCROLL
   * ----------------------------------------------------
   */

  useEffect(() => {
    const el = scroller.current

    if (!el) return

    /*
     * Don't auto-scroll for users who request
     * reduced motion.
     */
    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      return
    }

    const animate = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      const delta =
        time - lastTimeRef.current

      lastTimeRef.current = time

      if (!pausedRef.current) {
        const loopWidth =
          getLoopWidth()

        if (loopWidth > 0) {
          /*
           * Convert speed into movement based
           * on actual elapsed time.
           *
           * 0.7 = approximately 42px/second.
           */
          const movement =
            AUTO_SCROLL_SPEED *
            (delta / 16.67)

          el.scrollLeft += movement

          /*
           * When we reach the beginning of
           * the cloned cards, jump back.
           */
          if (
            el.scrollLeft >= loopWidth
          ) {
            el.scrollLeft -= loopWidth
          }
        }
      }

      animationRef.current =
        requestAnimationFrame(animate)
    }

    animationRef.current =
      requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        )
      }

      lastTimeRef.current = 0
    }
  }, [getLoopWidth])

  /*
   * ----------------------------------------------------
   * PAUSE + RESUME
   * ----------------------------------------------------
   */

  const pauseAndResume = useCallback(() => {
    pausedRef.current = true

    if (resumeTimerRef.current) {
      clearTimeout(
        resumeTimerRef.current
      )
    }

    resumeTimerRef.current =
      setTimeout(() => {
        pausedRef.current = false
      }, RESUME_DELAY)
  }, [])

  /*
   * ----------------------------------------------------
   * USER INTERACTION
   * ----------------------------------------------------
   */

  useEffect(() => {
    const el = scroller.current

    if (!el) return

    const handleWheel = () => {
      pauseAndResume()
    }

    const handleTouchStart = () => {
      pauseAndResume()
    }

    const handleTouchMove = () => {
      pauseAndResume()
    }

    const handlePointerDown = () => {
      pauseAndResume()
    }

    const handleMouseEnter = () => {
      pausedRef.current = true
    }

    const handleMouseLeave = () => {
      pausedRef.current = false
    }

    el.addEventListener(
      'wheel',
      handleWheel,
      { passive: true }
    )

    el.addEventListener(
      'touchstart',
      handleTouchStart,
      { passive: true }
    )

    el.addEventListener(
      'touchmove',
      handleTouchMove,
      { passive: true }
    )

    el.addEventListener(
      'pointerdown',
      handlePointerDown,
      { passive: true }
    )

    el.addEventListener(
      'mouseenter',
      handleMouseEnter
    )

    el.addEventListener(
      'mouseleave',
      handleMouseLeave
    )

    return () => {
      el.removeEventListener(
        'wheel',
        handleWheel
      )

      el.removeEventListener(
        'touchstart',
        handleTouchStart
      )

      el.removeEventListener(
        'touchmove',
        handleTouchMove
      )

      el.removeEventListener(
        'pointerdown',
        handlePointerDown
      )

      el.removeEventListener(
        'mouseenter',
        handleMouseEnter
      )

      el.removeEventListener(
        'mouseleave',
        handleMouseLeave
      )

      if (resumeTimerRef.current) {
        clearTimeout(
          resumeTimerRef.current
        )
      }
    }
  }, [pauseAndResume])

  /*
   * ----------------------------------------------------
   * PAGINATION
   * ----------------------------------------------------
   */

  const goTo = (i) => {
    const el = scroller.current

    if (!el) return

    const loopWidth =
      getLoopWidth()

    if (!loopWidth) return

    pauseAndResume()

    const target =
      (loopWidth * i) /
      Math.max(pages - 1, 1)

    el.scrollTo({
      left: target,
      behavior: 'smooth',
    })
  }

  /*
   * ----------------------------------------------------
   * RENDER
   * ----------------------------------------------------
   */

  return (
    <section className="bg-[#ebe9e4] py-14 text-[#001a44] [--pad:1.25rem] sm:[--pad:2.5rem] md:py-20 lg:[--pad:4rem]">

      <div className="mx-auto max-w-7xl px-[var(--pad)]">

        <p className="text-xs font-medium uppercase tracking-[0.15em] sm:text-md">
          Diverse Market Experience
        </p>

        <h2 className="mt-3 text-xl font-semibold leading-snug sm:mt-4 sm:text-2xl md:text-4xl">
          Destination Expertise
        </h2>

      </div>

      <div
        ref={scroller}
        role="region"
        aria-label="Destination types"
        style={{
          paddingLeft:
            'max(var(--pad), calc((100vw - 80rem) / 2 + var(--pad)))',

          scrollPaddingLeft:
            'max(var(--pad), calc((100vw - 80rem) / 2 + var(--pad)))',
        }}
        className="
          mt-8
          flex
          gap-3
          overflow-x-auto
          pr-[var(--pad)]
          overscroll-x-contain
          touch-pan-x
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          [-webkit-overflow-scrolling:touch]
          sm:gap-4
          md:mt-10
        "
      >

        {/* ORIGINAL CARDS */}
        {DESTINATIONS.map((d, index) => (
          <figure
            key={`original-${index}`}
            style={{
              width: 'var(--card-w, 80vw)',
            }}
            className="
              shrink-0
              select-none
            "
          >
            <div className="aspect-[3/2] w-full overflow-hidden bg-[#d9d6cf]">

              <img
                src={d.image}
                alt={d.title}
                loading={
                  index === 0
                    ? 'eager'
                    : 'lazy'
                }
                draggable="false"
                onDragStart={(e) =>
                  e.preventDefault()
                }
                className="
                  pointer-events-none
                  h-full
                  w-full
                  select-none
                  object-cover
                "
              />

            </div>

            <figcaption className="
              mt-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.1em]
              sm:mt-4
              sm:text-sm
            ">
              {d.title}
            </figcaption>
          </figure>
        ))}

        {/* CLONED CARDS */}
        {DESTINATIONS.map((d, index) => (
          <figure
            key={`clone-${index}`}
            data-first-clone={
              index === 0
                ? 'true'
                : undefined
            }
            aria-hidden="true"
            style={{
              width: 'var(--card-w, 80vw)',
            }}
            className="
              shrink-0
              select-none
            "
          >
            <div className="aspect-[3/2] w-full overflow-hidden bg-[#d9d6cf]">

              <img
                src={d.image}
                alt=""
                loading="lazy"
                draggable="false"
                onDragStart={(e) =>
                  e.preventDefault()
                }
                className="
                  pointer-events-none
                  h-full
                  w-full
                  select-none
                  object-cover
                "
              />

            </div>

            <figcaption className="
              mt-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.1em]
              sm:mt-4
              sm:text-sm
            ">
              {d.title}
            </figcaption>
          </figure>
        ))}

      </div>

      {/* PAGINATION */}
      {pages > 1 && (
        <div className="
          mt-8
          flex
          items-center
          justify-center
          gap-2.5
          md:mt-10
        ">
          {Array.from({
            length: pages,
          }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide group ${i + 1}`}
              aria-current={
                i === page
              }
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

// import React, { useCallback, useEffect, useRef, useState } from 'react'

// const DESTINATIONS = [
//   { title: 'Urban City Centers', image: '/images/pic1.jpg' },
//   { title: 'Mountain Leisure', image: '/images/pic2.jpg' },
//   { title: 'Beach Getaways', image: '/images/pic3.jpg' },
// ]

// const ChevronIcon = ({ direction = 'right', ...props }) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d={direction === 'left' ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'} />
//   </svg>
// )

// // Shortest signed distance from `active` to `i` around a circular arrangement of `n` items,
// // so the carousel can loop both directions instead of jumping back to the start.
// function shortestOffset(i, active, n) {
//   let diff = i - active
//   if (diff > n / 2) diff -= n
//   if (diff < -n / 2) diff += n
//   return diff
// }

// export default function DestinationExpertise() {
//   const [active, setActive] = useState(0)
//   const [compact, setCompact] = useState(false)
//   const dragRef = useRef({ startX: 0, dragging: false })
//   const n = DESTINATIONS.length

//   useEffect(() => {
//     const check = () => setCompact(window.innerWidth < 640)
//     check()
//     window.addEventListener('resize', check)
//     return () => window.removeEventListener('resize', check)
//   }, [])

//   const go = useCallback((dir) => setActive((a) => (a + dir + n) % n), [n])

//   const onKeyDown = (e) => {
//     if (e.key === 'ArrowRight') go(1)
//     if (e.key === 'ArrowLeft') go(-1)
//   }

//   const onPointerDown = (e) => {
//     dragRef.current = { startX: e.clientX, dragging: true }
//   }
//   const onPointerUp = (e) => {
//     if (!dragRef.current.dragging) return
//     const delta = e.clientX - dragRef.current.startX
//     dragRef.current.dragging = false
//     if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1)
//   }

//   // Wider spread now that the carousel is constrained to the content column,
//   // so the side cards sit nearer its edges instead of clustering in the middle
//   const spreadX = compact ? 50 : 68
//   const rotate = compact ? 18 : 26
//   const depth = compact ? 90 : 160

//   return (
//     <section className="relative overflow-hidden bg-[#ebe9e4] py-14 text-[#001a44] md:py-20">
//       {/* Soft background glows so the space either side of the cards isn't flat empty color */}
//       <div
//         className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#bc8b29]/10 blur-3xl"
//         aria-hidden="true"
//       />
//       <div
//         className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#001a44]/10 blur-3xl"
//         aria-hidden="true"
//       />

//       <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
//         <p className="text-xs font-medium uppercase tracking-[0.15em] sm:text-sm">
//           Diverse Market Experience
//         </p>
//         <h2 className="mt-3 text-xl font-semibold leading-snug sm:mt-4 sm:text-2xl md:text-3xl">
//           Destination Expertise
//         </h2>
//       </div>

//       <div
//         role="region"
//         aria-label="Destination types"
//         tabIndex={0}
//         onKeyDown={onKeyDown}
//         onPointerDown={onPointerDown}
//         onPointerUp={onPointerUp}
//         onPointerLeave={() => (dragRef.current.dragging = false)}
//         className="relative mx-auto mt-10 flex h-[280px] max-w-7xl touch-pan-y items-center justify-center select-none px-6 [perspective:1400px] focus:outline-none sm:h-[360px] sm:px-10 md:mt-14 md:h-[440px] lg:px-16"
//       >
//         {DESTINATIONS.map((d, i) => {
//           const offset = shortestOffset(i, active, n)
//           const abs = Math.abs(offset)
//           const isActive = offset === 0
//           const visible = abs <= 2

//           return (
//             <button
//               key={d.title}
//               type="button"
//               onClick={() => setActive(i)}
//               aria-current={isActive}
//               tabIndex={visible ? 0 : -1}
//               className="absolute w-[68vw] max-w-[320px] shrink-0 cursor-pointer text-left transition-[transform,opacity] duration-500 ease-out sm:w-[46vw] sm:max-w-[380px] lg:w-[420px]"
//               style={{
//                 transform: `translateX(${offset * spreadX}%) translateZ(${isActive ? 0 : -depth}px) rotateY(${-offset * rotate}deg) scale(${isActive ? 1 : 0.82})`,
//                 opacity: visible ? (isActive ? 1 : 0.55) : 0,
//                 zIndex: 10 - abs,
//                 pointerEvents: visible ? 'auto' : 'none',
//               }}
//             >
//               <div className="aspect-[3/2] w-full overflow-hidden rounded-sm bg-[#d9d6cf] shadow-xl">
//                 <img
//                   src={d.image}
//                   alt={d.title}
//                   loading="lazy"
//                   draggable="false"
//                   className="pointer-events-none h-full w-full select-none object-cover"
//                 />
//               </div>
//               <p
//                 className={`mt-3 text-xs font-semibold uppercase tracking-[0.1em] transition-opacity duration-300 sm:mt-4 sm:text-sm ${
//                   isActive ? 'opacity-100' : 'opacity-0'
//                 }`}
//               >
//                 {d.title}
//               </p>
//             </button>
//           )
//         })}

//         {/* Arrows */}
//         <button
//           type="button"
//           aria-label="Previous destination"
//           onClick={() => go(-1)}
//           className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#001a44]/20 bg-white text-[#001a44] shadow-sm transition-colors hover:bg-[#001a44] hover:text-white sm:left-4 sm:h-12 sm:w-12"
//         >
//           <ChevronIcon direction="left" className="h-5 w-5" />
//         </button>
//         <button
//           type="button"
//           aria-label="Next destination"
//           onClick={() => go(1)}
//           className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#001a44]/20 bg-white text-[#001a44] shadow-sm transition-colors hover:bg-[#001a44] hover:text-white sm:right-4 sm:h-12 sm:w-12"
//         >
//           <ChevronIcon direction="right" className="h-5 w-5" />
//         </button>
//       </div>

//       {/* Dots */}
//       <div className="mt-8 flex items-center justify-center gap-2.5 md:mt-10">
//         {DESTINATIONS.map((_, i) => (
//           <button
//             key={i}
//             type="button"
//             aria-label={`Go to slide ${i + 1}`}
//             aria-current={i === active}
//             onClick={() => setActive(i)}
//             className={`h-2.5 w-2.5 rounded-full transition-colors ${
//               i === active ? 'bg-[#001a44]' : 'bg-[#8b93a8] hover:bg-[#5b6690]'
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }