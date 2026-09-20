import React, { useRef, useState } from 'react'

/*
  Each tab has a list of brands and an image.
  - Add a `logo` path (e.g. '/images/brands/westin.svg') to any brand to show the real logo.
    Without one, the brand name is shown as text.
  - Fill the empty `brands` arrays for the other tabs with your own data.
*/
const TABS = [
  {
    id: 'premium',
    label: 'Premium',
    image: '/images/portfolio-premium.jpg',
    imageAlt: 'Hotel lounge with seating area and fireplace',
    brands: [
      { name: 'Westin', logo: '' },
      { name: 'Kimpton', logo: '' },
      { name: 'Hilton', logo: '' },
      { name: 'Hyatt Regency', logo: '' },
      { name: 'Curio Collection', logo: '' },
      { name: 'Autograph Collection', logo: '' },
    ],
  },
  { id: 'enhanced-select', label: 'Enhanced Select', image: '', imageAlt: '', brands: [] },
  { id: 'select', label: 'Select', image: '', imageAlt: '', brands: [] },
  { id: 'echelon', label: 'Echelon', image: '', imageAlt: '', brands: [] },
  { id: 'resort', label: 'Resort', image: '', imageAlt: '', brands: [] },
  { id: 'restaurants-bars', label: 'Restaurants & Bars', image: '', imageAlt: '', brands: [] },
]

function BrandMark({ brand }) {
  if (brand.logo) {
    return <img src={brand.logo} alt={brand.name} className="max-h-12 w-auto max-w-[140px] object-contain" />
  }
  return (
    <span className="text-center text-sm font-semibold uppercase tracking-[0.1em] text-slate-800">
      {brand.name}
    </span>
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
    <section className="bg-[#ebe9e4] text-[#112d5e]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 md:py-20 lg:px-16">
        <p className="text-sm font-medium uppercase tracking-[0.15em]">Our Portfolio</p>
        <h2 className="mt-4 max-w-xl text-2xl font-semibold leading-snug sm:text-3xl">
          Solutions-Oriented Approach for Diverse Experiences
        </h2>

        {/* Tabs */}
        <div className="mt-8 border-b border-[#e6a48f] md:mt-10">
          <div
            role="tablist"
            aria-label="Portfolio categories"
            onKeyDown={onKeyDown}
            className="-mb-px flex gap-6 overflow-x-auto whitespace-nowrap md:gap-8 lg:gap-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  className={`shrink-0 border-b-[3px] pb-3 text-xs font-semibold uppercase tracking-[0.08em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8590c] ${
                    selected
                      ? 'border-[#e8590c] text-[#e8590c]'
                      : 'border-transparent text-[#112d5e] hover:text-[#e8590c]'
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
          className="mt-10 grid items-center gap-10 md:mt-12 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-7">
            {active.brands.length ? (
              <ul className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-y-16">
                {active.brands.map((brand) => (
                  <li key={brand.name} className="flex h-16 w-full items-center justify-center">
                    <BrandMark brand={brand} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#112d5e]/70">No brands added for this category yet.</p>
            )}
          </div>

          <div className="lg:col-span-5">
            {active.image ? (
              <img
                src={active.image}
                alt={active.imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <div className="aspect-[4/3] w-full bg-[#d9d6cf]" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}