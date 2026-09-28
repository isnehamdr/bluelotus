import React, { useLayoutEffect, useRef, useState } from 'react'
import { Head } from '@inertiajs/react'
import Navbar from '@/HomeComponents/Navbar'
import Footer from '@/HomeComponents/Footer'
import BackToTop from '@/HomeComponents/BackToTop'

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

export default function DetailPage({ capability }) {
  const { label, title, intro, heroImage, items, experience } = capability

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
    <>
    <Navbar/>
    <BackToTop/>
    <main className="w-full font-['Montserrat',ui-sans-serif,system-ui,sans-serif]">
      <Head title={`${title} | Blue Lotus Hospitality`} />

      {/* ───────────── Hero ───────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] w-full overflow-hidden bg-slate-900 text-white sm:min-h-[85vh] lg:min-h-[90vh]"
      >
        {/* Single background image */}
        <img
          src={heroImage}
          alt={`Blue Lotus Hospitality - ${title}`}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Logo: travels from the hero into the navbar as the page scrolls, then stays docked there */}
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
            src="/images/logo.jpeg"
            alt="Blue Lotus Hospitality"
            className="h-full w-full rounded-full object-cover"
          />
        </a>

        {/* Center: spacer (reserves the logo's resting spot) and wordmark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-8 pt-32 sm:px-6 sm:pt-40 lg:pt-44">
          <div
            ref={spacerRef}
            className="h-24 w-24 sm:h-32 sm:w-32 lg:h-[180px] lg:w-[180px]"
            aria-hidden="true"
          />

          <p className="mt-6 text-center text-3xl font-light uppercase leading-none tracking-[0.12em] sm:mt-8 sm:text-4xl lg:mt-10 lg:text-5xl">
            {title}
          </p>
        </div>
      </section>

      {/* ───────────── Content ───────────── */}
      <div className="bg-[#e6e5e0] text-[#12294f]">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-24">
          {/* Intro */}
          <section>
            {label && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm">
                {label}
              </p>
            )}
            <h2 className="mt-3 text-3xl font-semibold tracking-wide sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {intro && (
              <p className="mt-5 max-w-3xl text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
                {intro}
              </p>
            )}
          </section>

          {/* Items */}
          <section className="mt-12 sm:mt-16 lg:mt-20">
            <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
              {items.map((item, i) => {
                const imageFirst = i % 2 === 0
                return (
                  <article
                    key={item.title}
                    className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-16"
                  >
                    {/* Image: always on top on mobile; alternates sides from md up */}
                    <div
                      className={`order-1 ${
                        imageFirst ? 'md:order-1' : 'md:order-2'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="aspect-[3/2] w-full object-cover"
                      />
                    </div>

                    {/* Text */}
                    <div
                      className={`order-2 ${
                        imageFirst ? 'md:order-2' : 'md:order-1'
                      }`}
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] sm:text-base lg:text-lg">
                        {i + 1}. {item.title}
                      </h3>

                      {/* Divider: thick bar over a thin line */}
                      <div
                        className="relative mt-3 h-2 w-full sm:h-3"
                        aria-hidden="true"
                      >
                        <div className="absolute inset-x-0 top-1/2 h-px bg-[#12294f]/30" />
                        <div className="absolute left-0 top-0 h-full w-[65%] bg-[#12294f]" />
                      </div>

                      {item.text && (
                        <p className="mt-5 text-base leading-7 sm:mt-6 sm:text-lg lg:text-xl lg:leading-8">
                          {item.text}
                        </p>
                      )}

                      {item.points && (
                        <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-7 marker:text-[#12294f] sm:mt-6 sm:text-lg lg:text-xl lg:leading-8">
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          {/* Optional extra block (e.g. global brand experience) */}
          {experience && (
            <section className="mt-14 sm:mt-20 lg:mt-24">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] sm:text-base lg:text-lg">
                {experience.title}
              </h3>
              <div className="relative mt-3 h-2 w-full sm:h-3" aria-hidden="true">
                <div className="absolute inset-x-0 top-1/2 h-px bg-[#12294f]/30" />
                <div className="absolute left-0 top-0 h-full w-[65%] bg-[#12294f]" />
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
                {experience.brands.map((brand) => (
                  <li
                    key={brand}
                    className="flex items-center justify-center border border-[#12294f]/30 px-3 py-4 text-center text-sm font-semibold sm:text-base"
                  >
                    {brand}
                  </li>
                ))}
              </ul>

              {experience.note && (
                <p className="mt-6 max-w-3xl text-base leading-7 sm:mt-8 sm:text-lg lg:text-xl lg:leading-8">
                  {experience.note}
                </p>
              )}
            </section>
          )}
        </div>
      </div>
    </main>
    <Footer/>
    </>
  )
}