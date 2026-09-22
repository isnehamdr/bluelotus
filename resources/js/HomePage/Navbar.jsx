import React, { useEffect, useState } from 'react'
import { Link } from '@inertiajs/react'

const NAV_LINKS = [
  {
    label: 'Our Capabilities',
    href: '/capabilities',
    children: [
      { label: 'Operator Model', href: '/capabilities/operator' },
      { label: 'Asset Management', href: '/capabilities/asset-management' },
      { label: 'Brand Liaison', href: '/capabilities/brand-liaison' },
    ],
  },
  { label: 'Our Team', href: '/team' },
  { label: 'Our Portfolio', href: '/portfolio' },
  { label: 'Our Impact', href: '/impact' },
  { label: 'Press', href: '/press' },
  { label: 'Careers', href: '/careers' },
  { label: 'Echelon', href: '/echelon' },
  { label: 'Urgo Hotels Canada', href: '/urgo-hotels-canada' },
]

const CloseIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-9 w-9 lg:h-10 lg:w-10" aria-hidden="true">
    <path d="M2 2 38 38M38 2 2 38" />
  </svg>
)

const ChevronDown = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [capsOpen, setCapsOpen] = useState(false)

  // Track scroll position for the header gradient
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const close = () => {
    setMenuOpen(false)
    setCapsOpen(false)
  }

  return (
    <>
      {/* Top bar: transparent at top, gradient overlay once scrolled, lines always white */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background] duration-300 ${
          scrolled ? '' : 'bg-transparent'
        }`}
        style={
          scrolled
            ? {
                backgroundImage:
                  'linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,0.0001))',
              }
            : undefined
        }
      >
        <div className="flex items-center justify-between px-6 py-6 md:px-12 lg:px-14 lg:py-8">
          {/* Hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-drawer"
            onClick={() => setMenuOpen(true)}
            className="group flex w-10 flex-col gap-[8px] py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:w-12 sm:gap-[10px] lg:w-14 lg:gap-[10px]"
          >
            <span className="block h-px w-full bg-white sm:h-[1.5px]" />
            <span className="block h-px w-full bg-white sm:h-[1.5px]" />
            <span className="block h-px w-full bg-white sm:h-[1.5px]" />
          </button>

          {/* Optional: logo on the right (uncomment & point to your asset) */}
          {/* <img
            src="/images/logo.jpeg"
            alt="Blue Lotus Hospitality"
            className="h-12 w-12 object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          /> */}
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer: full screen on mobile, inset navy panel on large screens */}
      <aside
        id="site-drawer"
        aria-hidden={!menuOpen}
        className={`fixed z-50 flex flex-col overflow-y-auto bg-[#001a44] text-white transition-all duration-300 ease-out
          inset-0
          lg:inset-y-4 lg:left-8 lg:right-auto lg:w-[450px]
          ${menuOpen ? 'visible translate-x-0 opacity-100' : 'invisible -translate-x-full opacity-0'}`}
      >
        <div className="px-6 pt-6 md:px-10 lg:px-8 lg:pt-7">
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="-m-2 p-2 text-[#bc8b29]/90 transition hover:text-[] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 px-6 pb-10 pt-8 md:px-10 lg:px-[90px] lg:pt-12" aria-label="Main">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={capsOpen}
                      onClick={() => setCapsOpen((o) => !o)}
                      className="flex w-full items-center gap-3 py-4 text-left text-[13px] font-semibold uppercase tracking-[0.12em] hover:text-white/80 lg:py-5"
                    >
                      {link.label}
                      <ChevronDown open={capsOpen} />
                    </button>
                    <ul
                      className={`grid transition-all duration-300 ${
                        capsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <li className="overflow-hidden">
                        <ul className="space-y-1 pb-3 pl-4">
                          {link.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={close}
                                className="block py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/70 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block py-4 text-[13px] font-semibold uppercase tracking-[0.12em] hover:text-white/80 lg:py-5"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}