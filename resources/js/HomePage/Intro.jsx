import React from 'react'

export default function Intro({
  title = 'Best-In-Class Hospitality Management',
  body = "HHM Hotels offers tailored solutions that are aligned with your investment strategy. Leveraging deep market knowledge, an ownership mindset, and a skilled leadership team, we create customized platforms for each partner. This flexible, solutions-focused approach enhances asset value and delivers above-market returns, ensuring partners benefit from HHM Hotels' top-tier management capabilities.",
}) {
  return (
    <section className="relative bg-[#ebe9e4] text-[#112d5e]">
      {/* Soft shadow where the hero meets this section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/[0.07] to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </h2>

        <p className="mt-8 max-w-4xl text-[15px] leading-[1.9] sm:text-base md:mt-10 lg:text-[17px]">
          {body}
        </p>
      </div>
    </section>
  )
}