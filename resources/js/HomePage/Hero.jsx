// import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

// // Replace src values with your own property photography (e.g. /images/hero-1.jpg)
// // Replace captions with real Blue Lotus managed properties once available.
// const SLIDES = [
//   { src: '/images/hero1.jpg', caption: 'Property One, Kathmandu, Nepal' },
//   { src: '/images/hero2.jpg', caption: 'Property Two, Pokhara, Nepal' },
//   { src: '/images/hero3.jpg', caption: 'Property Three, Chitwan, Nepal' },
//   { src: '/images/hero4.jpg', caption: 'Property Four, Bhaktapur, Nepal' },
// ]

// const INTERVAL_MS = 6000

// // Where the logo settles once it reaches the navbar.
// // Tweak these to line up with your Navbar's own spacing.
// const DOCK_TOP = 20 // px from the viewport top to the docked logo's top edge
// const DOCK_SIZE = 58 // px, docked logo width/height
// // Fraction of the hero's height the user scrolls before the logo is fully docked
// const DOCK_SCROLL_FRACTION = 0.5

// export default function Hero() {
//   const [active, setActive] = useState(0)
//   const [logoStyle, setLogoStyle] = useState({ top: 0, size: DOCK_SIZE })

//   const heroRef = useRef(null)
//   const spacerRef = useRef(null)
//   const tickingRef = useRef(false)

//   // Slide autoplay
//   useEffect(() => {
//     const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
//     if (reduce) return
//     const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL_MS)
//     return () => clearInterval(id)
//   }, [active])

//   // Pin the logo to scroll position: it starts at its resting spot in the hero
//   // and blends toward the docked navbar position as the hero scrolls away.
//   useLayoutEffect(() => {
//     const update = () => {
//       if (!spacerRef.current || !heroRef.current) return

//       const rect = spacerRef.current.getBoundingClientRect()
//       const scrollY = window.scrollY
//       const restCenterY = rect.top + rect.height / 2 + scrollY
//       const restSize = rect.width

//       const heroHeight = heroRef.current.offsetHeight
//       const dockAt = Math.max(heroHeight * DOCK_SCROLL_FRACTION, 150)
//       const progress = Math.min(Math.max(scrollY / dockAt, 0), 1)

//       const dockCenterY = DOCK_TOP + DOCK_SIZE / 2
//       const naturalViewportY = restCenterY - scrollY // where it'd sit if it just scrolled normally

//       setLogoStyle({
//         top: naturalViewportY + (dockCenterY - naturalViewportY) * progress,
//         size: restSize + (DOCK_SIZE - restSize) * progress,
//       })
//     }

//     const onScrollOrResize = () => {
//       if (tickingRef.current) return
//       tickingRef.current = true
//       requestAnimationFrame(() => {
//         update()
//         tickingRef.current = false
//       })
//     }

//     update()
//     window.addEventListener('scroll', onScrollOrResize, { passive: true })
//     window.addEventListener('resize', onScrollOrResize)
//     return () => {
//       window.removeEventListener('scroll', onScrollOrResize)
//       window.removeEventListener('resize', onScrollOrResize)
//     }
//   }, [])

//   return (
//     <section ref={heroRef} className="relative min-h-[90vh] w-full overflow-hidden bg-slate-900 text-white">
//       {/* Slides */}
//       {SLIDES.map((slide, i) => (
//         <img
//           key={slide.src}
//           src={slide.src}
//           alt={slide.caption}
//           className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
//             i === active ? 'opacity-100' : 'opacity-0'
//           }`}
//         />
//       ))}

//       {/* Dark overlay for legibility */}
//       <div className="absolute inset-0 bg-black/45" />

//       {/* Logo: travels from the hero into the navbar as the page scrolls, then stays docked there */}
//       <img
//         src="/images/logo.jpeg"
//         alt="Blue Lotus Hospitality"
//         className="fixed left-1/2 z-[45] object-contain drop-shadow-md"
//         style={{
//           top: logoStyle.top,
//           width: logoStyle.size,
//           height: logoStyle.size,
//           transform: 'translate(-50%, -50%)',
//         }}
//       />

//       {/* Center: spacer (keeps original spacing now the real logo lives above), dots, wordmark */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-8 pt-44">
//         <div ref={spacerRef} className="h-24 w-24 sm:h-32 sm:w-32 lg:h-[180px] lg:w-[180px]" aria-hidden="true" />

//         <div
//           className="mt-6 flex items-center gap-3 sm:mt-8 lg:mt-10"
//           role="tablist"
//           aria-label="Hero slides"
//         >
//           {SLIDES.map((slide, i) => (
//             <button
//               key={slide.src}
//               type="button"
//               role="tab"
//               aria-selected={i === active}
//               aria-label={`Show slide ${i + 1}`}
//               onClick={() => setActive(i)}
//               className={`h-2.5 w-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-3 sm:w-3 ${
//                 i === active ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
//               }`}
//             />
//           ))}
//         </div>

//         <p className="mt-3 text-3xl font-light leading-none tracking-[0.12em] sm:mt-4 sm:text-4xl lg:text-5xl">
//           HOTELS
//         </p>
//       </div>

//       {/* Caption: centered on small screens, bottom-right on large */}
//       <p
//         key={active}
//         className="absolute inset-x-0 bottom-6 px-6 text-center text-sm font-medium text-white/90 lg:inset-x-auto lg:bottom-9 lg:right-[190px] lg:px-0 lg:text-left lg:text-base"
//       >
//         {SLIDES[active].caption}
//       </p>
//     </section>
//   )
// }



import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Replace src values with your own property photography (e.g. /images/hero-1.jpg)
// Replace captions with real Blue Lotus managed properties once available.
const SLIDES = [
  { src: '/images/hero1.jpg', caption: 'Property One, Kathmandu, Nepal' },
  { src: '/images/hero2.jpg', caption: 'Property Two, Pokhara, Nepal' },
  { src: '/images/hero3.jpg', caption: 'Property Three, Chitwan, Nepal' },
  { src: '/images/hero4.jpg', caption: 'Property Four, Bhaktapur, Nepal' },
]

const INTERVAL_MS = 6000

// Fraction of the hero's height the user scrolls before the logo is fully docked
const DOCK_SCROLL_FRACTION = 0.5

// Docked logo sizes per breakpoint (px) — smaller on mobile, larger on desktop
const DOCK_SIZE_MOBILE = 36   // < 640px
const DOCK_SIZE_SM     = 44   // >= 640px  (sm)
const DOCK_SIZE_LG     = 58   // >= 1024px (lg)

// Distance from viewport top to the docked logo's center (px), per breakpoint.
// Keeps the docked logo vertically aligned with the Navbar's hamburger.
const DOCK_TOP_MOBILE = 26
const DOCK_TOP_SM     = 28
const DOCK_TOP_LG     = 30

const getDockSize = () => {
  if (typeof window === 'undefined') return DOCK_SIZE_LG
  const w = window.innerWidth
  if (w >= 1024) return DOCK_SIZE_LG
  if (w >= 640) return DOCK_SIZE_SM
  return DOCK_SIZE_MOBILE
}

const getDockTop = () => {
  if (typeof window === 'undefined') return DOCK_TOP_LG
  const w = window.innerWidth
  if (w >= 1024) return DOCK_TOP_LG
  if (w >= 640) return DOCK_TOP_SM
  return DOCK_TOP_MOBILE
}

export default function Hero() {
  const [active, setActive] = useState(0)
  const [logoStyle, setLogoStyle] = useState({ top: 0, size: DOCK_SIZE_LG })

  const heroRef = useRef(null)
  const spacerRef = useRef(null)
  const tickingRef = useRef(false)

  // Slide autoplay
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [active])

  // Pin the logo to scroll position: it starts at its resting spot in the hero
  // and blends toward the docked navbar position as the hero scrolls away.
  useLayoutEffect(() => {
    const update = () => {
      if (!spacerRef.current || !heroRef.current) return

      const dockSize = getDockSize()
      const dockTop = getDockTop()

      const rect = spacerRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const restCenterY = rect.top + rect.height / 2 + scrollY
      const restSize = rect.width

      const heroHeight = heroRef.current.offsetHeight
      const dockAt = Math.max(heroHeight * DOCK_SCROLL_FRACTION, 150)
      const progress = Math.min(Math.max(scrollY / dockAt, 0), 1)

      const dockCenterY = dockTop + dockSize / 2
      const naturalViewportY = restCenterY - scrollY // where it'd sit if it just scrolled normally

      setLogoStyle({
        top: naturalViewportY + (dockCenterY - naturalViewportY) * progress,
        size: restSize + (dockSize - restSize) * progress,
      })
    }

    const onScrollOrResize = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(() => {
        update()
        tickingRef.current = false
      })
    }

    update()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[84vh] w-full overflow-hidden bg-slate-900 text-white"
    >
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

      {/* Logo: travels from the hero into the navbar as the page scrolls, then stays docked there */}
     <img
  src="/images/logo.jpeg"
  alt="Blue Lotus Hospitality"
  className="fixed left-1/2 z-[45] rounded-full object-cover drop-shadow-md"
  style={{
    top: logoStyle.top,
    width: logoStyle.size,
    height: logoStyle.size,
    transform: 'translate(-50%, -50%)',
  }}
/>

      {/* Center: spacer (keeps original spacing now the real logo lives above), dots, wordmark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-8 pt-44">
        <div
          ref={spacerRef}
          className="h-24 w-24 sm:h-32 sm:w-32 lg:h-[180px] lg:w-[180px]"
          aria-hidden="true"
        />

        <div
          className="mt-6 flex items-center gap-3 sm:mt-8 lg:mt-10"
          role="tablist"
          aria-label="Hero slides"
        >
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-3 sm:w-3 ${
                i === active ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-3xl font-light leading-none tracking-[0.12em] sm:mt-4 sm:text-4xl lg:text-5xl">
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