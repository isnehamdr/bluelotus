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
    image: '/images/portfolio.jpg',
    imageAlt: 'Hotel lounge with seating area and fireplace',
    brands: [
      { name: 'Westin', logo: '/images/logo1.png' },
      { name: 'Kimpton', logo: '/images/logo2.png' },
      { name: 'Hilton', logo: '/images/logo3.png' },
      { name: 'Hyatt Regency', logo: '/images/logo4.png' },
      { name: 'Curio Collection', logo: '/images/logo5.png' },
      { name: 'Autograph Collection', logo: '/images/logo6.png' },
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
    return <img src={brand.logo} alt={brand.name} className="max-h-16 w-auto max-w-[180px] object-contain" />
  }
  return (
    <span className="text-center text-sm font-semibold uppercase leading-snug tracking-[0.1em] text-[#001a44]">
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
    <section className="bg-[#ebe9e4] text-[#001a44]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-0 sm:pb-24 sm:px-10 lg:px-16 ">
        <p className="text-lg font-semibold uppercase tracking-[0.15em]">Our Portfolio</p>
        <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug sm:text-3xl lg:text-4xl tracking-[0.06em]">
          Solutions-Oriented Approach for Diverse Experiences
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
                  className={`shrink-0 border-b-[12px] pb-3 text-md font-semibold uppercase tracking-[0.08em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bc8b29] ${
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
              <ul className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:gap-y-16">
                {active.brands.map((brand) => (
                  <li key={brand.name} className="flex min-h-[64px] w-full items-center justify-center px-2 py-2">
                    <BrandMark brand={brand} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#001a44]/70">No brands added for this category yet.</p>
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