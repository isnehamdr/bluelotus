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
    className={`h-5 w-5 shrink-0 transition-transform duration-300 sm:h-6 sm:w-6 ${open ? 'rotate-180' : ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 9 7 7 7-7" />
  </svg>
)

export default function Capabilities({
  image = '/images/img1.jpg',
  imageAlt = 'Hotel lounge with fireplace and leather sofas',
  title = 'Customizable Capabilities',
  subtitle = 'Comprehensive Support, Personalized for Your Property',
  items = CAPABILITIES,
}) {
  const [open, setOpen] = useState(null) // one panel open at a time

  return (
    <section className="bg-[#ebe9e4] text-[#001a44]">
      <div className="grid items-stretch gap-6 px-5 sm:px-0 py-12 sm:gap-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-20">
        {/* Image: same start alignment as content, fixed height matching content */}
        <div className="w-full overflow-hidden rounded-sm bg-[#d9d6cf]">
          <img
            src={image}
            alt={imageAlt}
            className="h-full max-h-[260px] w-full object-cover sm:max-h-[500px] lg:max-h-none lg:h-full lg:min-h-[560px]"
          />
        </div>

        {/* Text + accordion */}
        <div className="flex w-full flex-col justify-center">
          <div className="w-full max-w-xl lg:max-w-xl">
            <h2 className="text-2xl font-semibold leading-tight sm:text-4xl lg:text-[2.5rem] xl:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed sm:mt-4 sm:text-lg lg:text-xl">
              {subtitle}
            </p>

            <div className="mt-8 sm:mt-10 lg:mt-12">
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
                        className="flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-semibold uppercase tracking-wide transition-colors hover:text-[#001a44]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#001a44]/50 sm:gap-4 sm:py-5 sm:text-xl lg:py-6 lg:text-xl"
                      >
                        <span className="min-w-0">{item.title}</span>
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
                        <p className="pb-4 pr-4 text-xs leading-relaxed text-[#001a44]/85 sm:pb-5 sm:pr-8 sm:text-base lg:text-lg">
                          {item.content}
                        </p>
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