import React from 'react'

// Put your photos in public/image/ and update the paths below
const team = [
  { name: 'Anjan Bagale', role: 'CEO', image: '/images/person.png' },
  { name: 'Pooja Bagale', role: 'Chairman', image: '/images/person.png' },
  { name: 'Bidhan Pokhrel', role: 'Marketing', image: '/images/person.png' },
  { name: 'Binisha Singh Basnet', role: 'Marketing', image: '/images/person.png' },
]

const TeamSection = () => {
  return (
    <section
      className="w-full text-white py-10 sm:py-14 lg:py-16"
      style={{ backgroundColor: '#102a56', fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white">
          Our Team
        </h2>
        <p className="mt-6 max-w-3xl text-base sm:text-2xl leading-relaxed text-white">
          Our leadership team is made up of industry leaders who blend
          capability and experience to drive results each and every day.
        </p>

        {/* Cards (2x2) */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-12 max-w-7xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="relative overflow-hidden"
              style={{
                // Height in px: 240px on small screens, grows with width, max 520px on large screens
                height: 'clamp(240px, 24vw, 400px)',
                backgroundColor: '#9ca3af',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-contain"
                style={{ display: 'block' }}
              />

              {/* Bottom gradient + text */}
              <div
                className="absolute left-0 right-0 bottom-0 text-center px-3 pb-3"
                style={{
                  paddingTop: 56,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6) 60%, rgba(0,0,0,0))',
                }}
              >
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs text-white">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection