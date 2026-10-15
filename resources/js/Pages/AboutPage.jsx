import React, { useEffect, useRef } from 'react'
import { Head } from '@inertiajs/react'

// Adjust this path to wherever the home components live in your project.
import Navbar from '../HomeComponents/Navbar'
import About from '../HomeComponents/About'
import KeyStats from '../HomeComponents/KeyStats'
import Maps from '../HomeComponents/Maps'
import Footer from '../HomeComponents/Footer'
import BackToTop from '../HomeComponents/BackToTop'

const clamp = (n, min, max) => Math.min(Math.max(n, min), max)
const lerp = (a, b, t) => a + (b - a) * t

// Logo sizes (px) per breakpoint, matching Tailwind's sm (640) and lg (1024),
// plus the vertical centre of the navbar row where the logo docks.
function getSizes() {
  const w = window.innerWidth
  if (w >= 1024) return { big: 180, small: 56, dockY: 52 }
  if (w >= 640) return { big: 128, small: 48, dockY: 44 }
  return { big: 96, small: 44, dockY: 42 }
}

/*
  Page banner
  Full-bleed photo, 45% black overlay, centred logo, light uppercase wordmark.

  Logo transition: an empty placeholder keeps the logo's space in the layout.
  The real logo is position:fixed and, on every scroll, is placed where the
  placeholder is on screen until it reaches the navbar row, then stays there.
  Its size shrinks from big to small over the same distance. Everything is
  derived from scrollY, so scrolling back up reverses it automatically.

  The About component owns the <h1>, so the wordmark here is a <p>.
*/
function PageBanner({
  image = '/images/about1.jpg',
  imageAlt = 'Blue Lotus Hospitality managed property',
  label = 'About Us',
}) {
  const placeholderRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const placeholder = placeholderRef.current
    const logo = logoRef.current
    if (!placeholder || !logo) return

    let frame = 0

    const update = () => {
      frame = 0
      const { big, small, dockY } = getSizes()
      const scrollY = window.scrollY

      // Centre of the placeholder in document coordinates (independent of scroll)
      const rect = placeholder.getBoundingClientRect()
      const docCenter = rect.top + scrollY + rect.height / 2

      // 0 = resting in the banner, 1 = docked in the navbar
      const distance = Math.max(docCenter - dockY, 1)
      const progress = clamp(scrollY / distance, 0, 1)

      const size = lerp(big, small, progress)
      const centerY = Math.max(docCenter - scrollY, dockY)

      logo.style.width = `${size}px`
      logo.style.height = `${size}px`
      logo.style.top = `${centerY - size / 2}px`
      logo.style.visibility = 'visible'
    }

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden bg-slate-900 text-white lg:min-h-[90vh]">
      <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-8 pt-28">
        {/* Placeholder: reserves the big logo's space so the layout never shifts */}
        <div
          ref={placeholderRef}
          aria-hidden="true"
          className="h-24 w-24 sm:h-32 sm:w-32 lg:h-[180px] lg:w-[180px]"
        />

        <p className="mt-6 text-3xl font-light uppercase leading-none tracking-[0.12em] sm:mt-8 sm:text-4xl lg:mt-10 lg:text-5xl">
          {label}
        </p>
      </div>

      {/* The real logo: fixed, above the navbar bar (z-40) but below the drawer (z-50) */}
      <a
        ref={logoRef}
        href="/"
        aria-label="Blue Lotus Hospitality - go to home page"
        className="invisible fixed left-1/2 z-[41] block -translate-x-1/2 rounded-full drop-shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <img
          src="/images/logo.png"
          alt="Blue Lotus Hospitality"
          className="h-full w-full rounded-full object-cover"
        />
      </a>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <Head title="About Us | Blue Lotus Hospitality" />

      <Navbar />
      <BackToTop/>

      <main>
        <PageBanner />

        {/* Who we are, How we operate, closing statement */}
        <About />

        {/* KeyStats removes its top padding on lg because on the home page it sits directly
            under Intro. After About's navy closing band it needs that space back. */}
        <div className="bg-[#ebe9e4] lg:pt-16">
          <KeyStats />
        </div>

        <Maps />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}