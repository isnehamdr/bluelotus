import React from 'react'

// Use "\n" in `headline` to force a line break (as in "200+ / HOTELS").
const STATS = [
  { headline: '200+\nHOTELS', description: '' },
  { headline: '50+ YEARS', description: 'experience in hospitality management' },
  { headline: '30+ BRANDS', description: 'of hotels and restaurants under management' },
  { headline: '10 YEARS', description: 'average senior leadership tenure' },
]

export default function KeyStats({ title = 'Key to Our Success', stats = STATS }) {
  return (
    <section className="bg-[#ebe9e4] text-[#e8590c]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <h2 className="text-lg font-medium uppercase tracking-[0.15em] sm:text-xl">{title}</h2>

        <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-[0.85fr_1.05fr_1.2fr_1.2fr] lg:gap-x-12 lg:gap-y-0">
          {stats.map((stat) => (
            <li key={stat.headline}>
              <span aria-hidden="true" className="block h-px w-28 bg-slate-500/70 lg:w-32" />
              <p className="mt-6 whitespace-pre-line text-3xl font-semibold uppercase leading-[1.1] sm:text-4xl">
                {stat.headline}
              </p>
              {stat.description && (
                <p className="mt-4 max-w-[17rem] text-base leading-snug lg:text-lg">{stat.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}