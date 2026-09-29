// import React from 'react'

// /* ───────────── Shared pieces ───────────── */

// function Divider() {
//   return (
//     <div className="relative mt-3 h-2 w-full sm:h-3" aria-hidden="true">
//       <div className="absolute inset-x-0 top-1/2 h-px bg-[#12294f]/30" />
//       <div className="absolute left-0 top-0 h-full w-[65%] bg-[#12294f]" />
//     </div>
//   )
// }

// function Points({ points, className = '' }) {
//   if (!points) return null
//   return (
//     <ul
//       className={`list-disc space-y-2 pl-5 text-base leading-7 sm:text-lg lg:text-xl lg:leading-8 ${className}`}
//     >
//       {points.map((point) => (
//         <li key={point}>{point}</li>
//       ))}
//     </ul>
//   )
// }

// /* ───────────── Layout 1: alternating image / text rows (default) ───────────── */

// function AlternatingLayout({ items }) {
//   return (
//     <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
//       {items.map((item, i) => {
//         const imageFirst = i % 2 === 0
//         return (
//           <article
//             key={item.title}
//             className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-10 lg:gap-16"
//           >
//             <div className={`order-1 ${imageFirst ? 'md:order-1' : 'md:order-2'}`}>
//               <img
//                 src={item.image}
//                 alt={item.alt}
//                 loading="lazy"
//                 className="aspect-[3/2] w-full object-cover"
//               />
//             </div>

//             <div className={`order-2 ${imageFirst ? 'md:order-2' : 'md:order-1'}`}>
//               <h3 className="text-sm font-semibold uppercase tracking-[0.12em] sm:text-base lg:text-lg">
//                 {i + 1}. {item.title}
//               </h3>
//               <Divider />

//               {item.text && (
//                 <p className="mt-5 text-base leading-7 sm:mt-6 sm:text-lg lg:text-xl lg:leading-8">
//                   {item.text}
//                 </p>
//               )}
//               <Points
//                 points={item.points}
//                 className="mt-5 marker:text-[#12294f] sm:mt-6"
//               />
//             </div>
//           </article>
//         )
//       })}
//     </div>
//   )
// }

// /* ───────────── Layout 2: navy cards in a grid (like the Pillar Two slide) ───────────── */
// // Optional per-item field: "icon": "/images/icons/chart.svg"
// // If there is no icon, the card shows the item number in a gold circle.

// function CardsLayout({ items }) {
//   return (
//     <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
//       {items.map((item, i) => (
//         <article
//           key={item.title}
//           className="flex items-start gap-5 bg-[#0c1633] p-6 text-white sm:gap-6 sm:p-8"
//         >
//           <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#c99a2e] text-xl font-semibold text-[#0c1633] sm:h-16 sm:w-16 sm:text-2xl">
//             {item.icon ? (
//               <img src={item.icon} alt="" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
//             ) : (
//               i + 1
//             )}
//           </div>

//           <div className="min-w-0">
//             <h3 className="text-base font-semibold sm:text-lg lg:text-xl">{item.title}</h3>
//             {item.text && (
//               <p className="mt-3 text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
//                 {item.text}
//               </p>
//             )}
//             <Points
//               points={item.points}
//               className="mt-3 !text-sm !leading-6 text-white/85 marker:text-[#c99a2e] sm:!text-base sm:!leading-7"
//             />
//           </div>
//         </article>
//       ))}
//     </div>
//   )
// }

// /* ───────────── Registry: add new layouts here ───────────── */

// const LAYOUTS = {
//   alternating: AlternatingLayout,
//   cards: CardsLayout,
// }

// export default function ItemLayouts({ layout = 'alternating', items }) {
//   const Layout = LAYOUTS[layout] ?? AlternatingLayout
//   return <Layout items={items} />
// }

import React from 'react'

/* ───────────── Shared pieces ───────────── */

function Divider() {
  return (
    <div className="relative mt-3 h-2 w-full sm:h-3" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px bg-[#12294f]/30" />
      <div className="absolute left-0 top-0 h-full w-[65%] bg-[#12294f]" />
    </div>
  )
}

function Points({ points, className = '' }) {
  if (!points) return null
  return (
    <ul
      className={`list-disc space-y-2 pl-5 text-base leading-7 sm:text-lg lg:text-xl lg:leading-8 ${className}`}
    >
      {points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  )
}

/* ───────────── Layout 1: alternating image / text rows (default) ───────────── */

function AlternatingLayout({ items }) {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
      {items.map((item, i) => {
        const imageFirst = i % 2 === 0
        return (
          <article
            key={item.title}
            className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-10 lg:gap-16"
          >
            <div className={`order-1 ${imageFirst ? 'md:order-1' : 'md:order-2'}`}>
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>

            <div className={`order-2 ${imageFirst ? 'md:order-2' : 'md:order-1'}`}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] sm:text-base lg:text-lg">
                {i + 1}. {item.title}
              </h3>
              <Divider />

              {item.text && (
                <p className="mt-5 text-base leading-7 sm:mt-6 sm:text-lg lg:text-xl lg:leading-8">
                  {item.text}
                </p>
              )}
              <Points
                points={item.points}
                className="mt-5 marker:text-[#12294f] sm:mt-6"
              />
            </div>
          </article>
        )
      })}
    </div>
  )
}

/* ───────────── Layout 2: navy cards in a grid (like the Pillar Two slide) ───────────── */
// Optional per-item field: "icon": "/images/icons/chart.svg"
// If there is no icon, the card shows the item number in a gold circle.

function CardsLayout({ items }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
      {items.map((item, i) => (
        <article
          key={item.title}
          className="flex items-start gap-5 bg-[#0c1633] p-6 text-white sm:gap-6 sm:p-8"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#c99a2e] text-xl font-semibold text-[#0c1633] sm:h-16 sm:w-16 sm:text-2xl">
            {item.icon ? (
              <img src={item.icon} alt="" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
            ) : (
              i + 1
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-semibold sm:text-lg lg:text-xl">{item.title}</h3>
            {item.text && (
              <p className="mt-3 text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
                {item.text}
              </p>
            )}
            <Points
              points={item.points}
              className="mt-3 !text-sm !leading-6 text-white/85 marker:text-[#c99a2e] sm:!text-base sm:!leading-7"
            />
          </div>
        </article>
      ))}
    </div>
  )
}

/* ───────────── Registry: add new layouts here ───────────── */

const LAYOUTS = {
  alternating: AlternatingLayout,
  cards: CardsLayout,
}

export default function ItemLayouts({ layout = 'alternating', items }) {
  const Layout = LAYOUTS[layout] ?? AlternatingLayout
  return <Layout items={items} />
}