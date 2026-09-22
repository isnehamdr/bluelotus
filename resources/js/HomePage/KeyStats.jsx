import React from 'react'

const STATS = [
  { headline: '200+\nHOTELS', description: '' },
  { headline: '50+ YEARS', description: 'experience in hospitality management' },
  { headline: '30+ BRANDS', description: 'of hotels and restaurants under management' },
  { headline: '10 YEARS', description: 'average senior leadership tenure' },
]

export default function KeyStats({ title = 'Key to Our Success', stats = STATS }) {
  return (
    <section className="bg-[#ebe9e4] text-[#bc8b29]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 md:py-20 lg:px-16 lg:pb-20 lg:pt-0">
        <h2 className="text-sm font-semibold uppercase tracking-wide sm:text-base md:text-lg">
          {title}
        </h2>

        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-8 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-[0.85fr_1.05fr_1.2fr_1.2fr] lg:gap-x-12 lg:gap-y-0">
          {stats.map((stat) => (
            <li key={stat.headline} className="min-w-0">
              <span
                aria-hidden="true"
                className="block h-px w-14 bg-[#bc8b29] sm:w-20 lg:w-32"
              />
              <p className="mt-3 whitespace-pre-line text-xl font-semibold uppercase leading-tight sm:mt-5 sm:text-2xl md:text-3xl lg:mt-6">
                {stat.headline}
              </p>
              {stat.description && (
                <p className="mt-2 max-w-full text-xs leading-snug sm:text-sm md:text-base lg:text-md">
                  {stat.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}