// import React from 'react'

// // Put your photos in public/images/ and update the paths below
// const team = [
//   { name: 'Anjan Bagale', role: 'CEO', image: '/images/user.png' },
//   { name: 'Pooja Bagale', role: 'Chairman', image: '/images/user.png' },
//   { name: 'Bidhan Pokhrel', role: 'Marketing', image: '/images/user.png' },
//   { name: 'Binisha Singh Basnet', role: 'Marketing', image: '/images/user.png' },
// ]

// const FALLBACK =
//   "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='%23cbd5e1'/><circle cx='200' cy='190' r='70' fill='%2394a3b8'/><rect x='80' y='290' width='240' height='210' rx='110' fill='%2394a3b8'/></svg>"

// const TeamSection = () => {
//   return (
//     <section
//       className="w-full py-12 sm:py-16 lg:py-20 text-white"
//       style={{ backgroundColor: '#102a56', fontFamily: "'Montserrat', sans-serif" }}
//     >
//       <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
//         {/* Heading */}
//         <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
//           Our Team
//         </h2>
//         <p className="mt-4 sm:mt-6 max-w-3xl text-base sm:text-xl leading-relaxed text-white/90">
//           Our leadership team is made up of industry leaders who blend
//           capability and experience to drive results each and every day.
//         </p>

//         {/* Cards: 2 cols on mobile/tablet, 4 on large screens */}
//         <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//           {team.map((member) => (
//             <div
//               key={member.name}
//               className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-300 ring-1 ring-white/20 shadow-lg"
//             >
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 loading="lazy"
//                 onError={(e) => {
//                   e.currentTarget.onerror = null
//                   e.currentTarget.src = FALLBACK
//                 }}
//                 className="absolute inset-0 h-full w-full object-contain"
//               />

//               {/* Bottom gradient + text */}
//               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pb-4 pt-16 text-center">
//                 <h3 className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wide leading-tight">
//                   {member.name}
//                 </h3>
//                 <p className="mt-1 text-[11px] sm:text-xs lg:text-sm text-white/80">
//                   {member.role}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TeamSection


import React from 'react'

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>" +
      "<rect width='400' height='500' fill='#cbd5e1'/>" +
      "<circle cx='200' cy='190' r='70' fill='#94a3b8'/>" +
      "<rect x='80' y='290' width='240' height='210' rx='110' fill='#94a3b8'/>" +
      '</svg>'
  )

// Replace `image` with a real photo path (e.g. '/images/anjan.jpg') when you have one.
// Leave it empty/undefined to show the placeholder.
const team = [
  { name: 'Anjan Bagale', role: 'CEO', image: FALLBACK },
  { name: 'Pooja Bagale', role: 'Chairman', image: FALLBACK },
  { name: 'Bidhan Pokhrel', role: 'Marketing', image: FALLBACK },
  { name: 'Binisha Singh Basnet', role: 'Marketing', image: FALLBACK },
]

const TeamSection = () => {
  return (
    <section
      className="w-full py-12 sm:py-16 lg:py-20 text-white"
      style={{ backgroundColor: '#102a56', fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
          Our Team
        </h2>
        <p className="mt-4 sm:mt-6 max-w-3xl text-base sm:text-xl leading-relaxed text-white/90">
          Our leadership team is made up of industry leaders who blend
          capability and experience to drive results each and every day.
        </p>

        {/* Cards: 2 cols on mobile/tablet, 4 on large screens */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="group flex h-full flex-col overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/20 shadow-lg"
            >
              {/* Photo */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-300">
                <img
                  src={member.image || FALLBACK}
                  alt={member.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = FALLBACK
                  }}
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Name + role */}
              <div className="flex flex-1 flex-col items-center justify-center px-3 py-4 text-center">
                <h3 className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wide leading-tight">
                  {member.name}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs lg:text-sm text-white/70">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection