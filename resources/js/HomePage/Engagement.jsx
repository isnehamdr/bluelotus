import React from 'react'


const steps = [
  {
    number: '01',
    title: 'Assess',
    description: 'Property, market and brand-fit review.',
    tone: 'gold',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Structure',
    description: 'Define management, asset & brand scope.',
    tone: 'navy',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v6H4zM4 14h7v6H4zM14 14h6v6h-6z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Mobilise',
    description: 'Deploy leadership team & SOPs.',
    tone: 'gold',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
        <circle cx="9" cy="7" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6M16 8a3 3 0 1 1 3.5 3M17.5 14.5c2 .4 3.5 2 3.5 4" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Operate',
    description: 'Run operations to agreed standards.',
    tone: 'navy',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Report & Grow',
    description: 'Ongoing oversight and value creation.',
    tone: 'gold',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v16a2 2 0 0 0 2 2h16M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
]




const Engagement = () => (
  <section aria-labelledby="engagement-heading" className="overflow-hidden bg-[#eeefec] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a641d]">Our Approach</p>
        <h2 id="engagement-heading" className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[#001a44] sm:text-5xl">
          How We <span className="text-[#a77a24]">Engage</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#001a44]/70">
          A structured, five-stage path from first assessment to long-term value creation.
        </p>
      </div>

      <ol className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:mt-16 sm:grid-cols-2 lg:mb-10 lg:grid-cols-5 lg:gap-0">
        {steps.map((step, index) => {
          const isBottomBand = index % 2 === 1
          const isNavy = step.tone === 'navy'

          return (
            <li key={step.number} className={`relative flex min-w-0 flex-col rounded-2xl ${
              isBottomBand
                ? 'bg-gradient-to-b from-[#eeefec] to-white lg:translate-y-10 lg:rounded-t-none'
                : 'bg-gradient-to-b from-white to-[#eeefec] lg:rounded-b-none'
            }`}>
              {/* Mirror the upper-panel shadow at both edges of each recessed panel. */}
              {(isBottomBand ? ['left', 'right'] : []).map((side) => (
                <div
                  key={side}
                  aria-hidden="true"
                  className={`pointer-events-none absolute z-10 w-2.5 sm:w-3 ${
                    side === 'left'
                      ? '-left-2.5 bottom-6 top-6 -scale-x-100 sm:-left-3 lg:-top-4 lg:bottom-10 lg:left-0 lg:w-4 lg:scale-x-100'
                      : '-right-2.5 bottom-6 top-6 sm:-right-3 lg:-top-4 lg:bottom-10 lg:right-0 lg:w-4 lg:-scale-x-100'
                  }`}
                  style={{
                    background: 'linear-gradient(to right, rgba(35, 43, 47, 0.24), rgba(35, 43, 47, 0.13) 25%, rgba(35, 43, 47, 0.04) 60%, transparent)',
                    maskImage: 'linear-gradient(to bottom, transparent, black 10%, rgba(0, 0, 0, 0.65) 40%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, rgba(0, 0, 0, 0.65) 40%, transparent 100%)',
                  }}
                />
              ))}
              <div aria-hidden="true" className={`h-6 shrink-0 border-t border-white/40 ${isBottomBand ? 'order-last rounded-b-2xl' : 'rounded-t-2xl'} ${
                isNavy ? 'bg-gradient-to-b from-[#527499] to-[#173c66]' : 'bg-gradient-to-b from-[#e4c36e] to-[#bc8b29]'
              }`} />
              <div className="flex flex-1 flex-col px-6 pb-10 pt-7 sm:min-h-[260px] lg:min-h-[290px] lg:px-5 lg:pt-9 xl:px-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-4xl font-light tracking-tight text-[#001a44]/80">
                    <span className="sr-only">Step </span>{step.number}
                  </span>
                  <step.Icon aria-hidden="true" className={`h-6 w-6 shrink-0 ${isNavy ? 'text-[#365b80]' : 'text-[#a77a24]'}`} />
                </div>
                <h3 className={`mt-3 text-sm font-semibold uppercase tracking-[0.08em] ${isNavy ? 'text-[#365b80]' : 'text-[#8a641d]'}`}>
                  {step.title}
                </h3>
                <div aria-hidden="true" className={`my-4 h-px w-full ${isNavy ? 'bg-[#001a44]/20' : 'bg-[#bc8b29]/35'}`} />
                <p className="text-sm leading-7 text-[#39495b]">{step.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  </section>
)

export default Engagement