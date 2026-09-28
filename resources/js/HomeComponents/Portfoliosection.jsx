import React, { useRef, useState } from 'react'
const TABS = [
  {
    id: 'pillar-one',
    label: 'Pillar One',
    labelname: 'Operator Model',
    labelnameicon: '/images/building.png',
    image: '/images/portfolio.jpg',
    imageAlt: 'Hotel lounge with seating area and fireplace',
    brands: [
      { name: ' Room Division', logo: '/images/room.png' },
      { name: 'Food & Beverage', logo: '/images/spoon.png' },
      { name: 'Admin & General', logo: '/images/admin.png' },
      { name: 'Sales & Marketing', logo: '/images/sales.png' },
      { name: 'Information Technology', logo: '/images/informationtechnology.png' },
      { name: 'Engineering Department & Utility', logo: '/images/department.png' },
    ],
  },
  {
    id: 'pillar-two',
    label: 'Pillar Two',
    labelname: 'Asset Management Service',
     labelnameicon: '/images/growth.png',
    image: '/images/img6.png',
    imageAlt: 'Hotel lounge with seating area and fireplace',
    brands: [
      { name: 'Financial Performance', logo: '/images/financialgrowth.png' },
      { name: 'Capital Expenditure ', logo: '/images/capitalexpenditure.png' },
      { name: 'Revenue & Commercial Strategy', logo: '/images/revenue.png' },
      { name: 'Strategic Planning', logo: '/images/strategy.png' },
      { name: 'Operator Performance', logo: '/images/performance.png' },
      { name: 'Investment Decisions', logo: '/images/investment.png' },
    ],
  },
  {
    id: 'pillar-three',
    label: 'Pillar Three',
    labelname: 'Brand Liaison Service',
     labelnameicon: '/images/handshake.png',
    image: '/images/img1.jpg',
    imageAlt: 'Hotel lounge with seating area and fireplace',
    brands: [
      { name: ' Franchise & MA Structuring', logo: '/images/handshake.png' },
      { name: 'Standards Compliance', logo: '/images/performance.png' },
      { name: 'Loyalty & Distribution', logo: '/images/growth.png' },
      { name: 'Renewals & Repositioning', logo: '/images/badge1.png' },

    ],
  },
 
]

// Shown wherever a real logo/photo isn't available yet, so nothing ever renders
// as a broken image — just a consistent icon in the brand color.
const BuildingIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M4 21h16M14 21v-6h5a1 1 0 0 1 1 1v5M7 7h2M7 11h2M7 15h2M10 7h2M10 11h2M10 15h2"
    />
  </svg>
)

// Icon (logo if present, otherwise a fallback mark) paired with the name as its own label —
// never image-only and never text-only, so every card looks the same regardless of assets.
function BrandMark({ brand }) {
  return (
    <div className="flex flex-col items-center gap-2.5 text-center sm:gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm sm:h-20 sm:w-20">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt=""
            className="max-h-8 w-auto max-w-[52px] object-contain sm:max-h-12 sm:max-w-[64px]"
          />
        ) : (
          <BuildingIcon className="h-6 w-6 text-[#bc8b29] sm:h-8 sm:w-8" />
        )}
      </div>
      <span className="text-xs font-semibold uppercase leading-snug tracking-[0.1em] text-[#001a44] sm:text-sm">
        {brand.name}
      </span>
    </div>
  )
}

export default function PortfolioSection() {
  const [activeId, setActiveId] = useState(TABS[0].id)
  const tabRefs = useRef([])
  const activeIndex = TABS.findIndex((t) => t.id === activeId)
  const active = TABS[activeIndex]

  // Arrow-key navigation between tabs
  const onKeyDown = (e) => {
    const last = TABS.length - 1
    let next = null
    if (e.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1
    if (e.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActiveId(TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="bg-[#ebe9e4] text-[#001a44]">
      <div className="mx-auto max-w-7xl px-6 py-14  sm:py-24 sm:px-10 lg:px-16 ">
        <p className="text-lg font-semibold uppercase tracking-[0.15em]">Our Service Model</p>
        <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug sm:text-3xl lg:text-4xl tracking-[0.06em]">
          Three Pillars, One Accountable Partner
        </h2>

        {/* Tabs */}
        <div className="mt-8 border-b border-[#bc8b29] md:mt-10">
          <div
            role="tablist"
            aria-label="Portfolio categories"
            onKeyDown={onKeyDown}
            className="-mb-px flex gap-4 overflow-x-auto whitespace-nowrap sm:gap-6 md:gap-8 lg:gap-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((tab, i) => {
              const selected = tab.id === activeId
              return (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  type="button"
                  onClick={() => setActiveId(tab.id)}
                  className={`shrink-0 border-b-[3px] pb-3 text-md font-semibold uppercase tracking-[0.08em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bc8b29] ${
                    selected
                      ? 'border-[#bc8b29] text-[#bc8b29]'
                      : 'border-transparent text-[#001a44] hover:text-[#bc8b29]'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-10 grid items-center gap-10 md:mt-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-7">
            {active.brands.length ? (
              <ul className="grid grid-cols-2 items-center justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:gap-y-16">
                {active.brands.map((brand) => (
                  <li key={brand.name} className="flex w-full items-center justify-center px-2 py-2">
                    <BrandMark brand={brand} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#001a44]/70">No brands added for this category yet.</p>
            )}
          </div>

          <div className="lg:col-span-5">
  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#d9d6cf]">
    {active.image ? (
      <>
        <img
          src={active.image}
          alt={active.imageAlt}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-[#001a44]/80 px-4 py-3 text-white sm:px-6 sm:py-4">
          <img
  src={active.labelnameicon}
  alt=""
  className="h-12 w-12 shrink-0 object-contain brightness-0 invert sm:h-6 sm:w-6"
/>

          <span className="text-xs font-semibold uppercase tracking-[0.1em] sm:text-lg">
            {active.labelname}
          </span>
        </div>
      </>
    ) : (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[#001a44]/50">
        <BuildingIcon className="h-9 w-9 sm:h-10 sm:w-10" />

        <span className="text-xs font-semibold uppercase tracking-[0.1em] sm:text-sm">
          {active.label}
        </span>
      </div>
    )}
  </div>
</div>
        </div>
      </div>
    </section>
  )
}