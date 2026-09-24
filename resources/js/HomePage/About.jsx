import React, { useState } from 'react'

const PILLARS = [
  {
    title: 'Operator',
    content: 'End-to-end hotel operations, from pre-opening to daily performance.',
  },
  {
    title: 'Asset Management',
    content: 'Owner-side oversight that protects and grows investment value.',
  },
  {
    title: 'Brand Liaison',
    content: 'Structuring and managing relationships with global hotel brands.',
  },
]

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

const About = ({
  title = 'Blue Lotus Hospitality',
  intro = "Blue Lotus Hospitality is a full-service hotel and resort management company that operates at the intersection of ownership, brand, and guest experience. We bring institutional discipline and boutique attention together, giving owners a single, accountable partner for every stage of an asset's lifecycle.",
  tagline = 'A boutique hospitality management company built on precision, discretion, and results.',
  image = '/images/d5.jpg',
  imageAlt = 'A Blue Lotus managed property',
  pillars = PILLARS,
  quote = 'One partner. Three disciplines. Total accountability across every stage of ownership.',
}) => {
  const [open, setOpen] = useState(0)

  return (
    <>
      {/* Intro */}
      <section className="bg-[#ebe9e4] text-[#001a44]">
        <div className="mx-auto max-w-7xl px-6 pt-14 sm:px-10 md:pt-24 md:pb-6 lg:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#bc8b29]">
            Who We Are
          </p>
          <h1 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#001a44]/85 sm:text-lg">
            {intro}
          </p>
          <div className="mt-8 max-w-xl md:mt-6">
            <p className="mt-4 text-lg text-[#001a44]/85  leading-relaxed sm:text-xl">{tagline}</p>
          </div>
        </div>
      </section>

      {/* Image + accordion */}
      <section className="bg-[#ebe9e4] text-[#001a44]">
        <div className="grid items-stretch gap-6 px-5 sm:px-0 py-12 sm:gap-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:pb-20">
          <div className="w-full overflow-hidden rounded-sm bg-[#d9d6cf]">
            <img
              src={image}
              alt={imageAlt}
              className="h-full max-h-[260px] w-full object-cover sm:max-h-[500px]  lg:min-h-[480px]"
            />
          </div>

          <div className="flex w-full flex-col justify-center">
            <div className="w-full max-w-xl">
              <h2 className="text-2xl font-semibold leading-tight sm:text-4xl lg:text-[2.5rem] xl:text-4xl">
                How We Operate
              </h2>
              <p className="mt-3 text-sm leading-relaxed sm:mt-4 sm:text-lg lg:text-xl">
                Three disciplines, one accountable partner.
              </p>

              <div className="mt-8 sm:mt-10 lg:mt-12">
                {pillars.map((item, i) => {
                  const isOpen = open === i
                  return (
                    <div key={item.title} className="border-b border-slate-400/80">
                      <h3>
                        <button
                          type="button"
                          id={`pillar-btn-${i}`}
                          aria-expanded={isOpen}
                          aria-controls={`pillar-panel-${i}`}
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-semibold uppercase tracking-wide transition-colors hover:text-[#001a44]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#001a44]/50 sm:gap-4 sm:py-5 sm:text-xl lg:py-6 lg:text-xl"
                        >
                          <span className="min-w-0">{item.title}</span>
                          <Chevron open={isOpen} />
                        </button>
                      </h3>
                      <div
                        id={`pillar-panel-${i}`}
                        role="region"
                        aria-labelledby={`pillar-btn-${i}`}
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

     {/* Closing statement */}
<div className="bg-[#001a44] text-white">
  <div className="flex flex-col items-center px-6 py-14 text-center sm:px-10 gap-4 sm:py-14 max-w-5xl mx-auto">
    <img
      src="/images/badge.png"
      alt="Blue Lotus Hospitality seal"
      className="h-16 w-16 object-cover"
    />
    <p className="mt-6 text-lg leading-relaxed sm:text-2xl">
      One partner. Three disciplines.
      <br />
      Total accountability across every stage of ownership.
    </p>
  </div>
</div>
    </>
  )
}

export default About