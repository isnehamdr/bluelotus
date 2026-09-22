import React from 'react'

export default function Intro({
  title = 'Best-In-Class Hospitality Management',
  body = "Blue Lotus Hospitality offers tailored solutions that are aligned with your investment strategy. Leveraging deep market knowledge, an ownership mindset, and a skilled leadership team, we create customized platforms for each partner. This flexible, solutions-focused approach enhances asset value and delivers above-market returns, ensuring partners benefit from HHM Hotels' top-tier management capabilities.",
}) {
  return (
    <section className="relative bg-[#ebe9e4] text-[#001a44]">
      {/* Soft shadow where the hero meets this section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/[0.07] to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-10 md:pb-24 md:pt-12 lg:px-16 ">
        <h2 className="text-2xl font-semibold leading-relaxed tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </h2>

        <p className="mt-8 max-w-4xl  text-[15px] text-left  leading-[2] tracking-[1px] sm:text-base md:mt-10 lg:text-xl">
          {body}
        </p>
      </div>
    </section>
  )
}