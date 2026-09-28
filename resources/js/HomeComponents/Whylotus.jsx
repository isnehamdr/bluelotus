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

const Whylotus = () => {
  return (
    <section className="relative overflow-hidden bg-[#001a44] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-28">
      {/* Watermark now anchors to the section itself, cropped at the corner */}
      <LotusWatermark className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 text-white/[0.05] sm:h-72 sm:w-72" />

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