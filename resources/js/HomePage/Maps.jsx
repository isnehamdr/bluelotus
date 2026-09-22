import React from 'react'

// Your Google Maps "Embed a map" iframe src.
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7493140.372831342!2d74.2364065312224!3d23.50515441931607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed395649ae7d3d%3A0x3d98ba147ca724f5!2sTHE%20BLUE%20LOTUS!5e0!3m2!1sen!2snp!4v1790060284376!5m2!1sen!2snp'

export default function Maps({
  title = 'Where We Operate Across Nepal',
  subtitle = 'From the Kathmandu Valley to the lakeside towns and lowland plains beyond',
}) {
  return (
    <section className="relative h-[460px] w-full overflow-hidden bg-[#1f2a52] sm:h-[520px] lg:h-[640px]">
      <iframe
        src={MAP_EMBED_SRC}
        title="Blue Lotus Hospitality location"
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />

      {/* Overlay text: soft gradient keeps it readable on small screens */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-[#1f2a52]/90 via-[#1f2a52]/50 to-transparent px-6 pb-16 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12">
        <h2 className=" max-w-7xl mx-auto px-6 sm:px-16 text-2xl font-semibold leading-snug text-white sm:text-3xl">{title}</h2>
        <p className="mt-4 max-w-7xl mx-auto px-6  sm:px-16 text-sm text-white sm:mt-6 sm:text-base">{subtitle}</p>
      </div>
    </section>
  )
}