import React from 'react'
import { Link } from '@inertiajs/react'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.99 3.07 15.02 3 13.9 3 11.5 3 9.86 4.47 9.86 7.2v2.4H7.1v3.2h2.76V21h3.64Z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.3-.8.5-1.6.8-2.5 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.9 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.4 3.5 3.2 3.9-.6.1-1.2.2-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 17.6a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5c.8-.5 1.4-1.2 1.9-1.9Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M17 14.3c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3ZM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.5 5.2L2 22l4.9-1.3A9.9 9.9 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

// Decorative lotus mark, echoing the brand mark used elsewhere on the site.
// NOTE: no `export default` here — Footer below is the only default export.
function LotusWatermark({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 72"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {/* Center petal */}
        <path d="M50 60 C43 48 40 26 50 8 C60 26 57 48 50 60" />

        {/* Inner petals */}
        <path d="M49.5 60 C43 48 35 29 31 18 C43 22 48 39 49.5 60" />
        <path d="M50.5 60 C57 48 65 29 69 18 C57 22 52 39 50.5 60" />

        {/* Middle petals */}
        <path d="M49 60 C37 54 24 39 20 27 C34 29 45 43 49 60" />
        <path d="M51 60 C63 54 76 39 80 27 C66 29 55 43 51 60" />

        {/* Outer petals */}
        <path d="M48.5 60 C33 59 16 48 10 39 C23 38 40 49 48.5 60" />
        <path d="M51.5 60 C67 59 84 48 90 39 C77 38 60 49 51.5 60" />

        {/* Inner decorative curves */}
        <path d="M49 59 C46 46 45 35 42 29" />
        <path d="M51 59 C54 46 55 35 58 29" />
        <path d="M44 58 C37 48 32 40 26 35" />
        <path d="M56 58 C63 48 68 40 74 35" />

        {/* Bottom flourishes */}
        <path d="M48 61 C37 66 27 67 17 64 C10 62 4 58 5 54 C6 51 10 52 13 54" />
        <path d="M52 61 C63 66 73 67 83 64 C90 62 96 58 95 54 C94 51 90 52 87 54" />

        {/* Center jewel */}
        <circle cx="50" cy="60" r="3.8" />
      </g>
    </svg>
  )
}

function SectionHeading({ children }) {
  return (
    <div className="mb-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">{children}</h2>
      <span aria-hidden="true" className="mt-2 block h-px w-8 bg-[#bc8b29]" />
    </div>
  )
}

export default function Footer({
  phone = '+977 985-116-8157',
  email = 'info@bluelotushospitality.com',
  address = 'Kathmandu, Nepal',
}) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-[#bc8b29]/30 bg-[#001a44] text-white">
      {/* Decorative watermark */}
      <LotusWatermark className="pointer-events-none absolute -right-2 bottom-10 h-72 w-72 text-[#0d264e] sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1.2fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpeg"
                alt="Blue Lotus Hospitality"
                className="h-11 w-11 object-contain"
              />
              <span className="text-sm font-semibold uppercase tracking-[0.1em] text-white">
                Blue Lotus Hospitality
              </span>
            </div>

            <p className="mt-5 max-w-[260px] text-sm leading-relaxed text-white/55">
              Full-service hotel and resort management, built on precision and accountability.
            </p>

            <div className="mt-6 flex items-center gap-4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/50 transition-colors hover:text-[#bc8b29] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bc8b29]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <SectionHeading>Quick Links</SectionHeading>
            <nav aria-label="Footer" className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-white/60 transition-colors hover:text-[#bc8b29]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* About */}
          <div>
            <SectionHeading>About Us</SectionHeading>
            <p className="text-sm leading-relaxed text-white/60">
              Blue Lotus Hospitality is a full-service hotel and resort management company that
              operates at the intersection of ownership, brand, and guest experience. We bring
              institutional discipline and boutique attention together, giving owners a single,
              accountable partner for every stage of an asset&apos;s lifecycle.
            </p>
          </div>

          {/* Contact */}
          <div>
            <SectionHeading>Contact</SectionHeading>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                className="text-white/60 transition-colors hover:text-[#bc8b29]"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="text-white/60 transition-colors hover:text-[#bc8b29]"
              >
                {email}
              </a>
              <p className="text-white/60">{address}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">
            © {year} Blue Lotus Hospitality. All rights reserved.
          </p>
          <p className="text-sm text-white/45">
            Crafted by:{' '}
            <a
              href="https://sait.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 underline-offset-2 hover:text-[#bc8b29] hover:underline"
            >
              S.A.I.T Solution Nepal
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}