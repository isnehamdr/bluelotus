import React, { useState } from 'react'

/* Placeholder content: replace `content` with your real descriptions. */
const CAPABILITIES = [
  'Strategic Operations',
  'Process & Technology',
  'Distribution & Digital',
  'Commercial & Marketing Strategy',
  'Investment & Asset Management',
  'Echelon Luxury & Lifestyle',
  'Hospitality Operations',
].map((title) => ({ title, content: `Add a short description of ${title.toLowerCase()} here.` }))

const Chevron = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    aria-hidden="true"
    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 9 7 7 7-7" />
  </svg>
)

export default function Capabilities({
  image = '/images/capabilities.jpg',
  imageAlt = 'Hotel lounge with fireplace and leather sofas',
  title = 'Customizable Capabilities',
  subtitle = 'Comprehensive Support, Personalized for Your Property',
  items = CAPABILITIES,
}) {
  const [open, setOpen] = useState(null) // one panel open at a time

  return (
    <section className="bg-[#ebe9e4] text-[#112d5e]">
      <div className="grid items-center gap-10 pb-14 lg:grid-cols-2 lg:gap-16 lg:py-16 xl:gap-24">
        {/* Image: flush with the left edge of the screen */}
        <div className="aspect-[4/3] w-full overflow-hidden bg-[#d9d6cf] sm:aspect-[16/9] lg:aspect-auto lg:h-[520px]">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        </div>

        {/* Text + accordion */}
        <div
          className="pl-[var(--pad)] [--pad:1.5rem] sm:[--pad:2.5rem] lg:pl-0 lg:[--pad:4rem]"
          style={{ paddingRight: 'max(var(--pad), calc((100vw - 80rem) / 2 + var(--pad)))' }}
        >
          <div className="lg:max-w-md">
            <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">{title}</h2>
            <p className="mt-3 text-sm sm:text-[15px]">{subtitle}</p>

            <div className="mt-8 border-t border-transparent">
              {items.map((item, i) => {
                const isOpen = open === i
                return (
                  <div key={item.title} className="border-b border-slate-400/80">
                    <h3>
                      <button
                        type="button"
                        id={`cap-btn-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`cap-panel-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.1em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#112d5e]/50 lg:py-[18px]"
                      >
                        {item.title}
                        <Chevron open={isOpen} />
                      </button>
                    </h3>
                    <div
                      id={`cap-panel-${i}`}
                      role="region"
                      aria-labelledby={`cap-btn-${i}`}
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pr-8 text-sm leading-relaxed text-[#112d5e]/85">{item.content}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}