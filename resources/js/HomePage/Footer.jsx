// import React from 'react'
// import { Link } from '@inertiajs/react'

// const NAV_LINKS = [
//   { label: 'Home', href: '/' },
//   { label: 'About', href: '/about' },
//   { label: 'Services', href: '/services' },
//   { label: 'Portfolio', href: '/portfolio' },
//   { label: 'Contact', href: '/contact' },
// ]

// const SOCIALS = [
//   {
//     label: 'Facebook',
//     href: 'https://facebook.com/',
//     Icon: (props) => (
//       <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//         <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.99 3.07 15.02 3 13.9 3 11.5 3 9.86 4.47 9.86 7.2v2.4H7.1v3.2h2.76V21h3.64Z" />
//       </svg>
//     ),
//   },
//   {
//     label: 'Twitter',
//     href: 'https://twitter.com/',
//     Icon: (props) => (
//       <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//         <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.3-.8.5-1.6.8-2.5 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.9 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.4 3.5 3.2 3.9-.6.1-1.2.2-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 17.6a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5c.8-.5 1.4-1.2 1.9-1.9Z" />
//       </svg>
//     ),
//   },
//   {
//     label: 'LinkedIn',
//     href: 'https://www.linkedin.com/',
//     Icon: (props) => (
//       <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//       </svg>
//     ),
//   },
//   {
//     label: 'WhatsApp',
//     href: 'https://wa.me/',
//     Icon: (props) => (
//       <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//         <path d="M17 14.3c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3ZM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.5 5.2L2 22l4.9-1.3A9.9 9.9 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2Z" />
//       </svg>
//     ),
//   },
//   {
//     label: 'Instagram',
//     href: 'https://instagram.com/',
//     Icon: (props) => (
//       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
//         <rect x="3" y="3" width="18" height="18" rx="5" />
//         <circle cx="12" cy="12" r="4" />
//         <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
//       </svg>
//     ),
//   },
// ]

// const ArrowIcon = (props) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
//   </svg>
// )

// // Oversized decorative lotus mark, echoing the brand mark used elsewhere on the site
// function LotusWatermark({ className = '' }) {
//   return (
//     <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
//       {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
//         <ellipse
//           key={angle}
//           cx="50"
//           cy="30"
//           rx="7"
//           ry="20"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.2"
//           transform={`rotate(${angle} 50 50)`}
//         />
//       ))}
//     </svg>
//   )
// }

// function SectionHeading({ children }) {
//   return (
//     <div className="mb-5">
//       <h2 className="text-md font-semibold uppercase tracking-[0.1em] text-white">{children}</h2>
//       <span aria-hidden="true" className="mt-2 block h-[3px] w-8 rounded-full bg-[#bc8b29]" />
//     </div>
//   )
// }

// export default function SimpleFooter({
//   phone = '+977 985-116-8157',
//   email = 'info@bluelotushospitality.com',
// }) {
//   const year = new Date().getFullYear()

//   return (
//     <footer className="relative overflow-hidden bg-gradient-to-b from-[#04295c] to-[#001233] text-white">
//       {/* Top accent bar */}
//       <div className="h-1 w-full bg-gradient-to-r from-[#bc8b29] via-[#e4c574] to-[#bc8b29]" />

//       {/* Decorative watermark */}
//       <LotusWatermark className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 text-white/[0.05] sm:h-96 sm:w-96" />

//       <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
//         <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.7fr_1.2fr_1fr] lg:gap-10">
//           {/* Brand */}
//           <div>
//             <div className="flex items-center gap-3">
//               <img src="/images/logo.jpeg" alt="Blue Lotus Hospitality" className="h-14 w-14 object-contain" />
//               <span className="text-lg font-semibold uppercase tracking-[0.1em] text-white">
//                 Blue Lotus
//               </span>
//             </div>

//             <p className="mt-5 max-w-[260px] text-sm leading-relaxed text-white/60">
//               Full-service hotel and resort management, built on precision and accountability.
//             </p>

//             <a
//               href="/contact"
//               className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#e4c574] transition-colors hover:text-white"
//             >
//               Get in touch
//               <ArrowIcon className="h-4 w-4" />
//             </a>

//             <div className="mt-6 flex items-center gap-2.5">
//               {SOCIALS.map(({ label, href, Icon }) => (
//                 <a
//                   key={label}
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={label}
//                   className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#bc8b29] hover:bg-[#bc8b29] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bc8b29]"
//                 >
//                   <Icon className="h-4 w-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Nav */}
//           <div>
//             <SectionHeading>Quick Links</SectionHeading>
//             <nav aria-label="Footer" className="flex flex-col gap-3">
//               {NAV_LINKS.map((link) => (
//                 <Link
//                   key={link.label}
//                   href={link.href}
//                   className="w-fit text-sm text-white/60 transition-colors hover:text-[#e4c574]"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* About */}
//           <div>
//             <SectionHeading>About Us</SectionHeading>
//             <p className="text-sm leading-relaxed text-white/60">
//               Blue Lotus Hospitality is a full-service hotel and resort management company that
//               operates at the intersection of ownership, brand, and guest experience. We bring
//               institutional discipline and boutique attention together, giving owners a single,
//               accountable partner for every stage of an asset&apos;s lifecycle.
//             </p>
//           </div>

//           {/* Contact */}
//           <div>
//             <SectionHeading>Contact</SectionHeading>
//             <div className="flex flex-col gap-3 text-sm">
//               <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="text-white/60 transition-colors hover:text-[#e4c574]">
//                 {phone}
//               </a>
//               <a href={`mailto:${email}`} className="text-white/60 transition-colors hover:text-[#e4c574]">
//                 {email}
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="relative mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
//           <p className="text-sm text-white/50">
//             © {year} Blue Lotus Hospitality. All rights reserved.
//           </p>
//           <p className="text-sm text-white/50">
//             Crafted by:{' '}
//             <a
//               href="https://sait.com.np/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="font-semibold text-[#e4c574] underline-offset-2 hover:underline"
//             >
//               S.A.I.T Solution Nepal
//             </a>
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }



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
// Kept small and cropped at the corner so it reads as a signature detail, not a centerpiece.
function LotusWatermark({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="30"
          rx="7"
          ry="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
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

export default function SimpleFooter({
  phone = '+977 985-116-8157',
  email = 'info@bluelotushospitality.com',
  address = 'Add your full street address here',
}) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-[#bc8b29]/30 bg-[#001a44] text-white">
      {/* Decorative watermark */}
      <LotusWatermark className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 text-white/[0.05] sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1.2fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpeg" alt="Blue Lotus Hospitality" className="h-11 w-11 object-contain" />
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
              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="text-white/60 transition-colors hover:text-[#bc8b29]">
                {phone}
              </a>
              <a href={`mailto:${email}`} className="text-white/60 transition-colors hover:text-[#bc8b29]">
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
          <p className="text-md text-white/45">
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