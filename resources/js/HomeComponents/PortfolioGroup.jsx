import React from 'react'

// One object per property. Each renders as its own block
// (name + location heading with rule, description on the left, one image on the right).
// Put the photos in public/images/ and update the paths below.
const groups = [
  {
    title: 'Best Western Plus Kathmandu Hotel',
    subtitle: 'Gaushala, Kathmandu',
    description:
      'Located in Gaushala, in the heart of Kathmandu, Best Western Plus Kathmandu Hotel welcomes business and leisure travellers with dependable service and a convenient base for exploring the capital.',
    image: '/images/exp1.jpg',
    imageAlt: 'Best Western Plus Kathmandu Hotel, Gaushala, Kathmandu',
  },
  {
    title: 'Best Western Siraichuli Hotel',
    subtitle: 'Bharatpur, Chitwan',
    description:
      'Best Western Siraichuli Hotel brings the Best Western standard to Bharatpur, offering comfortable stays for travellers visiting Chitwan for business, family trips and nature.',
    image: '/images/exp2.jpg',
    imageAlt: 'Best Western Siraichuli Hotel, Bharatpur, Chitwan',
  },
  {
    title: 'Manigram Bishram Batika',
    subtitle: 'Manigram',
    description:
      'Manigram Bishram Batika offers a relaxed place to stop and rest in Manigram, with warm hospitality for travellers passing through or staying a while.',
    image: '/images/exp3.webp',
    imageAlt: 'Manigram Bishram Batika, Manigram',
  },
  {
    title: 'River Bank Jungle Resort',
    subtitle: 'Chitwan',
    description:
      'River Bank Jungle Resort places guests in the natural setting of Chitwan, combining resort comfort with easy access to the region’s landscape and wildlife.',
    image: '/images/exp4.jpg',
    imageAlt: 'River Bank Jungle Resort, Chitwan',
  },
]

const PortfolioGroup = () => {
  return (
    <section
      className="bg-[#e6e5e0] px-6 pb-20 text-[#12294f] md:px-12 lg:px-24"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col  gap-12">
        {groups.map((group) => (
          <div key={group.title}>
            {/* Heading */}
            <h3 className="text-xl uppercase tracking-[0.12em] sm:text-2xl">
              <span className="font-bold">{group.title}</span>{' '}
              <span className="font-light">{group.subtitle}</span>
            </h3>

            {/* Rule: thick navy tab sitting on a thin full-width line */}
            <div className="mt-4 border-b border-[#12294f]">
              <div className="h-3 w-28 bg-[#0d2a54] sm:w-36" />
            </div>

            {/* Content */}
        {/* Content */}
<div className="mt-12 grid items-center gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
              <p className="text-lg leading-snug sm:text-xl lg:col-span-5 lg:text-2xl lg:leading-snug">
                {group.description}
              </p>

              <div className="lg:col-span-7">
                <img
                  src={group.image}
                  alt={group.imageAlt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PortfolioGroup