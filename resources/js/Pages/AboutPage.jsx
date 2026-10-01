import React from 'react'
import { Head } from '@inertiajs/react'

// Adjust this path to wherever the home components live in your project,
// e.g. '../Components/Home' or '@/Components/HomeComponents'.
import Navbar from '../HomeComponents/Navbar'
import About from '../HomeComponents/About'
import KeyStats from '../HomeComponents/KeyStats'
import Whylotus from '../HomeComponents/Whylotus'
import Engagement from '../HomeComponents/Engagement'
import PartnersCarousel from '../HomeComponents/Partnerscarousel'
import Maps from '../HomeComponents/Maps'
import Footer from '../HomeComponents/Footer'
import BackToTop from '../HomeComponents/BackToTop'

/*
  Page banner
  Same language as the home Hero (full-bleed photo, 45% black overlay, centred logo,
  light uppercase wordmark) but shorter and static, so the transparent fixed Navbar
  (white hamburger) stays readable. The About component below owns the <h1>,
  so the wordmark here is a <p>.
*/
function PageBanner({
  image = '/images/h2.jpg',
  imageAlt = 'Blue Lotus Hospitality managed property',
  label = 'About Us',
}) {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden bg-slate-900 text-white lg:min-h-[70vh]">
      <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-8 pt-28">
        <a
          href="/"
          aria-label="Blue Lotus Hospitality - go to home page"
          className="block rounded-full drop-shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <img
            src="/images/logo.jpeg"
            alt="Blue Lotus Hospitality"
            className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32 lg:h-[180px] lg:w-[180px]"
          />
        </a>

        <p className="mt-6 text-3xl font-light uppercase leading-none tracking-[0.12em] sm:mt-8 sm:text-4xl lg:mt-10 lg:text-5xl">
          {label}
        </p>
      </div>
    </section>
  )
}

/*
  Page flow (background rhythm matches the home page):

  1. Navbar          fixed, transparent over the banner
  2. PageBanner      photo + overlay + logo + "About Us"
  3. About           beige: Who We Are  ->  beige: image + How We Operate accordion  ->  navy: closing statement
  4. KeyStats        beige: "Key to Our Success" number strip
  5. Whylotus        navy: four reasons + quote
  6. Engagement      cream: five-step "How We Engage"
  7. PartnersCarousel beige: who we work with
  8. Maps            full-bleed map, "Where We Operate Across Nepal"
  9. Footer          navy
*/
export default function AboutPage() {
  return (
    <>
      <Head title="About Us | Blue Lotus Hospitality" />

      <Navbar />

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