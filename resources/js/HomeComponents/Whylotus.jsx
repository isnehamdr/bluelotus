import React from 'react'
import { Target, Layers3, ShieldCheck, Globe2 } from 'lucide-react'

const reasons = [
  {
    title: 'Owner-First Alignment',
    description: 'Every decision is measured against owner returns, not just occupancy.',
    icon: Target,
  },
  {
    title: 'Integrated Model',
    description: 'Operations, asset oversight and brand relations under one roof.',
    icon: Layers3,
  },
  {
    title: 'Institutional Standards',
    description: 'Reporting and controls built to investor and lender expectations.',
    icon: ShieldCheck,
  },
  {
    title: 'Global Brand Access',
    description: 'Established relationships across the leading international brand families.',
    icon: Globe2,
  },
]

// Decorative lotus mark, echoing the brand mark used elsewhere on the site.
// Kept small and cropped at the corner so it reads as a signature detail, not a centerpiece.
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

const Whylotus = () => {
  return (
    <section className="relative overflow-hidden bg-[#001a44] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-28">
      {/* Watermark now anchors to the section itself, cropped at the corner */}
      <LotusWatermark className="pointer-events-none absolute -bottom-16 -left-14 h-44 w-44 text-[#0d264e]  sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-7xl">
        {/* Main content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-20">
          {/* Left: heading */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <h2 className="font-serif text-4xl leading-[1.1] text-[#f2efe6] sm:text-5xl lg:text-[56px]">
              Why Blue Lotus
            </h2>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-[#bc8b29] sm:text-lg">
              A single point of accountability.
            </p>

             
          <div className="  lg:col-start-2  mt-14">
            <blockquote className=" font-serif text-lg leading-relaxed text-[#f2efe6] sm:text-xl lg:text-2xl max-w-2xl mx-auto">
              Blue Lotus Hospitality exists to give owners what fragmented service providers
              cannot — one accountable partner across operations, asset value, and brand
              relationships.
            </blockquote>
          </div>
      
          </div>

          {/* Right: reasons */}
          <div className="border-t border-[#bc8b29]/25">
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <div
                  key={reason.title}
                  className="group grid grid-cols-1 gap-5 border-b border-[#bc8b29]/25 py-7 transition-all duration-300 hover:pl-2 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6 sm:py-8"
                >
                  {/* Icon */}
                  <div className="flex items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#bc8b29]/50 bg-[#bc8b29]/10 text-[#bc8b29] transition-all duration-300 group-hover:border-[#bc8b29] group-hover:bg-[#bc8b29] group-hover:text-[#001a44] sm:h-14 sm:w-14">
                      <Icon size={22} strokeWidth={1.6} className="sm:h-6 sm:w-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:gap-8">
                    <div>
                      <div className="mb-2 text-xs font-medium tracking-[0.2em] text-[#bc8b29]/70">
                        0{index + 1}
                      </div>
                      <h3 className="font-serif text-xl leading-tight text-[#f2efe6] sm:text-2xl">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-[#9aa8c2] sm:text-base lg:text-lg">
                      {reason.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quote band — aligned to the reasons column using the same grid template,
            instead of the invalid `ml-[calc(0.9fr)]` (fr units don't work outside a
            grid-template, so that margin was silently doing nothing before). */}
       
      </div>
    </section>
  )
}

export default Whylotus