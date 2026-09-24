import React from 'react'

const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=Kathmandu%2C%20Nepal&output=embed'

export default function Maps({
  title = 'Where We Operate Across Nepal',
  subtitle = 'From the Kathmandu Valley to the lakeside towns and lowland plains beyond',
}) {
  return (
    <section className="relative h-[460px] w-full overflow-hidden bg-[#1f2a52] sm:h-[520px] lg:h-[640px]">
      <iframe
        src={MAP_EMBED_SRC}
        title="Blue Lotus Hospitality location in Kathmandu, Nepal"
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />

      {/* Overlay text */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-[#1f2a52]/90 via-[#1f2a52]/50 to-transparent px-6 pb-16 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12">
        <h2 className="mx-auto max-w-7xl px-6 text-2xl font-semibold leading-snug text-white sm:px-16 sm:text-3xl">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-7xl px-6 text-sm text-white sm:mt-6 sm:px-16 sm:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  )
}