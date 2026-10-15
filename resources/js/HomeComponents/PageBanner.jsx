import React, { useLayoutEffect, useRef, useState } from 'react'

// Fraction of the hero's height the user scrolls before the logo is fully docked
const DOCK_SCROLL_FRACTION = 0.5

// Docked logo sizes per breakpoint (px) — smaller on mobile, larger on desktop
const DOCK_SIZE_MOBILE = 36 // < 640px
const DOCK_SIZE_SM = 44 // >= 640px  (sm)
const DOCK_SIZE_LG = 58 // >= 1024px (lg)

// Distance from viewport top to the docked logo's center (px), per breakpoint.
// Keeps the docked logo vertically aligned with the Navbar's hamburger.
const DOCK_TOP_MOBILE = 26
const DOCK_TOP_SM = 28
const DOCK_TOP_LG = 30

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

// Usage: <PageBanner image="/images/contactbanner.jpg" alt="..." title="Contact Us" />
export default function PageBanner({ image, alt = '', title }) {
  const [logoStyle, setLogoStyle] = useState({ top: 0, size: DOCK_SIZE_LG })

  const heroRef = useRef(null)
  const spacerRef = useRef(null)
  const tickingRef = useRef(false)

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
      const naturalViewportY = restCenterY - scrollY

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
      className="relative min-h-[90vh] w-full overflow-hidden bg-slate-900 text-white"
    >
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Logo: travels from the hero into the navbar as the page scrolls, then stays docked there. */}
      <a
        href="/"
        aria-label="Blue Lotus Hospitality - go to home page"
        className="fixed left-1/2 z-[45] block rounded-full drop-shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{
          top: logoStyle.top,
          width: logoStyle.size,
          height: logoStyle.size,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <img
          src="/images/logo.png"
          alt="Blue Lotus Hospitality"
          className="h-full w-full rounded-full object-cover"
        />
      </a>

      {/* Center: spacer (keeps the logo's resting spot), then the page title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-8 pt-44">
        <div
          ref={spacerRef}
          className="h-24 w-24 sm:h-32 sm:w-32 lg:h-[180px] lg:w-[180px]"
          aria-hidden="true"
        />

        <p className="mt-3 text-3xl font-light uppercase leading-none tracking-[0.12em] sm:mt-4 sm:text-4xl lg:text-5xl">
          {title}
        </p>
      </div>
    </section>
  )
}