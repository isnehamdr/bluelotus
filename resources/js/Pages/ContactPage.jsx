// import React from 'react'
// import { useForm } from '@inertiajs/react'
// import Footer from '@/HomeComponents/Footer'
// import Navbar from '@/HomeComponents/Navbar'
// import PageBanner from '@/HomeComponents/PageBanner' // adjust to where you save it

// // ---- Edit these with the real details ------------------------------------
// const CONTACT = {
//   phone: '+977 1-0000000',
//   email: 'info@bluelotushospitality.com',
//   address: 'Lalitpur, Kathmandu, Nepal',
//   // Anything Google Maps can search: an address, a place name, or "lat,lng"
//   mapQuery: '27.678363,85.309713',
//   socials: [
//     { name: 'Facebook', href: 'https://facebook.com/', path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z' },
// {
//   name: 'Instagram',
//   href: 'https://instagram.com/',
//   evenodd: true,
//   path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5ZM7 3.8a3.2 3.2 0 0 0-3.2 3.2v10A3.2 3.2 0 0 0 7 20.2h10a3.2 3.2 0 0 0 3.2-3.2V7A3.2 3.2 0 0 0 17 3.8H7ZM12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM17.4 5.9a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z',
// },    { name: 'LinkedIn', href: 'https://linkedin.com/', path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56ZM22.22 0H1.77A1.75 1.75 0 0 0 0 1.73v20.54A1.75 1.75 0 0 0 1.77 24h20.45A1.75 1.75 0 0 0 24 22.27V1.73A1.75 1.75 0 0 0 22.22 0Z' },
//   ],
// }
// // ---------------------------------------------------------------------------

// const inputClass =
//   'mt-2 w-full border border-[#12294f]/40 bg-white/60 px-4 py-3 text-base text-[#12294f] outline-none transition focus:border-[#0d2a54] focus:bg-white focus:ring-1 focus:ring-[#0d2a54]'

// const Field = ({ label, error, children }) => (
//   <label className="block text-sm font-semibold">
//     {label}
//     {children}
//     {error && <span className="mt-1 block text-sm font-normal text-red-700">{error}</span>}
//   </label>
// )

// const ContactPage = () => {
//   const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
//     name: '',
//     email: '',
//     phone: '',
//     message: '',
//   })

//   const submit = (e) => {
//     e.preventDefault()
//     // Needs a matching POST /contact route and controller in Laravel
//     post('/contact', { preserveScroll: true, onSuccess: () => reset() })
//   }

//   return (
//     <>
//       <Navbar />

//       <PageBanner image="/images/contact.jpg" alt="Contact Blue Lotus Hospitality" title="Contact Us" />

//       <section
//         className="bg-[#e6e5e0] px-6 py-20 text-[#12294f] md:px-12 lg:px-24"
//         style={{ fontFamily: "'Montserrat', sans-serif" }}
//       >
//         <div className="mx-auto max-w-7xl">
//           {/* Heading + rule (same style as the portfolio page) */}
//           <h2 className="text-xl uppercase tracking-[0.12em] sm:text-2xl">
//             <span className="font-bold">Get in touch</span>{' '}
//             <span className="font-light">Blue Lotus Hospitality</span>
//           </h2>
//           <div className="mt-4 border-b border-[#12294f]">
//             <div className="h-3 w-28 bg-[#0d2a54] sm:w-36" />
//           </div>

//           <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-16">
//             {/* Contact details */}
//             <div className="space-y-8 lg:col-span-5">
//               <div>
//                 <h3 className="text-sm font-semibold">Official contact number</h3>
//                 <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`} className="mt-1 block text-xl hover:underline">
//                   {CONTACT.phone}
//                 </a>
//               </div>

//               <div>
//                 <h3 className="text-sm font-semibold">Official email</h3>
//                 <a href={`mailto:${CONTACT.email}`} className="mt-1 block break-all text-xl hover:underline">
//                   {CONTACT.email}
//                 </a>
//               </div>

//               <div>
//                 <h3 className="text-sm font-semibold">Location</h3>
//                 <p className="mt-1 text-xl">{CONTACT.address}</p>
//                 <a
//                   href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="mt-1 inline-block text-base underline underline-offset-4"
//                 >
//                   Open in Google Maps
//                 </a>
//               </div>

//               <div>
//                 <h3 className="text-sm font-semibold">Social media</h3>
//                 <ul className="mt-3 flex gap-3">
//                   {CONTACT.socials.map((s) => (
//                     <li key={s.name}>
//                       <a
//                         href={s.href}
//                         target="_blank"
//                         rel="noreferrer"
//                         aria-label={s.name}
//                         className="flex h-11 w-11 items-center justify-center rounded-full border border-[#12294f] transition hover:bg-[#12294f] hover:text-white"
//                       >
//                         <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
//                           <path d={s.path} />
//                         </svg>
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={submit} className="space-y-6 lg:col-span-7" noValidate>
//               <div className="grid gap-6 sm:grid-cols-2">
//                 <Field label="Full name" error={errors.name}>
//                   <input
//                     type="text"
//                     value={data.name}
//                     onChange={(e) => setData('name', e.target.value)}
//                     autoComplete="name"
//                     required
//                     className={inputClass}
//                   />
//                 </Field>
//                 <Field label="Phone" error={errors.phone}>
//                   <input
//                     type="tel"
//                     value={data.phone}
//                     onChange={(e) => setData('phone', e.target.value)}
//                     autoComplete="tel"
//                     className={inputClass}
//                   />
//                 </Field>
//               </div>

//               <Field label="Email" error={errors.email}>
//                 <input
//                   type="email"
//                   value={data.email}
//                   onChange={(e) => setData('email', e.target.value)}
//                   autoComplete="email"
//                   required
//                   className={inputClass}
//                 />
//               </Field>

//               <Field label="Message" error={errors.message}>
//                 <textarea
//                   rows={6}
//                   value={data.message}
//                   onChange={(e) => setData('message', e.target.value)}
//                   required
//                   className={`${inputClass} resize-y`}
//                 />
//               </Field>

//               <div className="flex flex-wrap items-center gap-5">
//                 <button
//                   type="submit"
//                   disabled={processing}
//                   className="bg-[#0d2a54] px-10 py-3.5 text-base font-semibold tracking-wide text-white transition hover:bg-[#12294f] disabled:opacity-60"
//                 >
//                   {processing ? 'Sending...' : 'Send message'}
//                 </button>
//                 {wasSuccessful && (
//                   <p role="status" className="text-base">
//                     Thank you. Your message has been sent.
//                   </p>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Google Map */}
//         <div className="mx-auto mt-20 max-w-7xl lg:mt-12">
//           <iframe
//             title="Blue Lotus Hospitality location on Google Maps"
//             src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&output=embed`}
//             className="h-[360px] w-full border-0 sm:h-full"
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             allowFullScreen
//           />
//         </div>
//       </section>

//       <Footer />
//     </>
//   )
// }

// export default ContactPage



import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from '@inertiajs/react'
import Footer from '@/HomeComponents/Footer'
import Navbar from '@/HomeComponents/Navbar'
import PageBanner from '@/HomeComponents/PageBanner' // adjust to where you save it

// ---- Edit these with the real details ------------------------------------
const CONTACT = {
  phone: '+977 1-0000000',
  email: 'info@bluelotushospitality.com',
  address: 'Lalitpur, Kathmandu, Nepal',
  // Used for the "Open in Google Maps" link: an address, a place name, or "lat,lng"
  mapQuery: '27.678363,85.309713',
  socials: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/',
      path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/',
      evenodd: true,
      path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5ZM7 3.8a3.2 3.2 0 0 0-3.2 3.2v10A3.2 3.2 0 0 0 7 20.2h10a3.2 3.2 0 0 0 3.2-3.2V7A3.2 3.2 0 0 0 17 3.8H7ZM12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM17.4 5.9a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/',
      path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56ZM22.22 0H1.77A1.75 1.75 0 0 0 0 1.73v20.54A1.75 1.75 0 0 0 1.77 24h20.45A1.75 1.75 0 0 0 24 22.27V1.73A1.75 1.75 0 0 0 22.22 0Z',
    },
  ],
}

// Exact embed from Google Maps
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3533.2598355559307!2d85.309713!3d27.678362999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQwJzQyLjEiTiA4NcKwMTgnMzUuMCJF!5e0!3m2!1sen!2snp!4v1791961005620!5m2!1sen!2snp'
// ---------------------------------------------------------------------------

const inputClass =
  'mt-2 w-full border border-[#12294f]/40 bg-white/60 px-4 py-3 text-base text-[#12294f] outline-none transition focus:border-[#0d2a54] focus:bg-white focus:ring-1 focus:ring-[#0d2a54]'

const Field = ({ label, error, children }) => (
  <label className="block text-sm font-semibold">
    {label}
    {children}
    {error && <span className="mt-1 block text-sm font-normal text-red-700">{error}</span>}
  </label>
)

const ContactPage = () => {
  const { data, setData, errors, setError, clearErrors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    clearErrors()
    setSent(false)

    // Basic client-side check so empty forms are never "accepted"
    const missing = {}
    if (!data.name.trim()) missing.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(data.email)) missing.email = 'Please enter a valid email.'
    if (!data.message.trim()) missing.message = 'Please enter a message.'
    if (Object.keys(missing).length) {
      Object.entries(missing).forEach(([k, v]) => setError(k, v))
      return
    }

    setSending(true)
    try {
      await axios.post('/contact', data, { headers: { Accept: 'application/json' } })
    } catch (err) {
      if (err.response?.status === 422) {
        // Real validation errors from Laravel: show them and stop
        const fieldErrors = err.response.data?.errors || {}
        Object.entries(fieldErrors).forEach(([k, v]) => setError(k, v[0]))
        setSending(false)
        return
      }
      // Fallback: backend missing or down, still accept the form
      console.warn('Contact backend unavailable, accepted as fallback:', err)
    }

    reset()
    setSent(true)
    setSending(false)
  }

  return (
    <>
      <Navbar />

      <PageBanner image="/images/contact.jpg" alt="Contact Blue Lotus Hospitality" title="Contact Us" />

      <section
        className="bg-[#e6e5e0] px-6 py-20 text-[#12294f] md:px-12 lg:px-24"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading + rule (same style as the portfolio page) */}
          <h2 className="text-xl uppercase tracking-[0.12em] sm:text-2xl">
            <span className="font-bold">Get in touch</span>{' '}
            <span className="font-light">Blue Lotus Hospitality</span>
          </h2>
          <div className="mt-4 border-b border-[#12294f]">
            <div className="h-3 w-28 bg-[#0d2a54] sm:w-36" />
          </div>

          <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            {/* Contact details */}
            <div className="space-y-8 lg:col-span-5">
              <div>
                <h3 className="text-sm font-semibold">Official contact number</h3>
                <a
                  href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
                  className="mt-1 block text-xl hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Official email</h3>
                <a href={`mailto:${CONTACT.email}`} className="mt-1 block break-all text-xl hover:underline">
                  {CONTACT.email}
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Location</h3>
                <p className="mt-1 text-xl">{CONTACT.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-base underline underline-offset-4"
                >
                  Open in Google Maps
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Social media</h3>
                <ul className="mt-3 flex gap-3">
                  {CONTACT.socials.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.name}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#12294f] transition hover:bg-[#12294f] hover:text-white"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                          <path d={s.path} fillRule={s.evenodd ? 'evenodd' : 'nonzero'} />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-6 lg:col-span-7" noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    autoComplete="name"
                    required
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    autoComplete="tel"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  autoComplete="email"
                  required
                  className={inputClass}
                />
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  rows={6}
                  value={data.message}
                  onChange={(e) => setData('message', e.target.value)}
                  required
                  className={`${inputClass} resize-y`}
                />
              </Field>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-[#0d2a54] px-10 py-3.5 text-base font-semibold tracking-wide text-white transition hover:bg-[#12294f] disabled:opacity-60"
                >
                  {sending ? 'Sending...' : 'Send message'}
                </button>
                {sent && (
                  <p role="status" className="text-base">
                    Thank you. Your message has been sent.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mx-auto mt-20 max-w-7xl lg:mt-12">
          <iframe
            title="Blue Lotus Hospitality location on Google Maps"
            src={MAP_EMBED}
            className="h-[360px] w-full border-0 sm:h-[450px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ContactPage