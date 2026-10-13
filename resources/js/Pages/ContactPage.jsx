import React from 'react'
import { useForm } from '@inertiajs/react'
import Footer from '@/HomeComponents/Footer'
import Navbar from '@/HomeComponents/Navbar'
import PageBanner from '@/HomeComponents/PageBanner' // adjust to where you save it

// ---- Edit these with the real details ------------------------------------
const CONTACT = {
  phone: '+977 1-0000000',
  email: 'info@bluelotushospitality.com',
  address: 'Gaushala, Kathmandu, Nepal',
  // Anything Google Maps can search: an address, a place name, or "lat,lng"
  mapQuery: 'Gaushala, Kathmandu, Nepal',
  socials: [
    { name: 'Facebook', href: 'https://facebook.com/', path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z' },
    { name: 'Instagram', href: 'https://instagram.com/', path: 'M12 7.38A4.62 4.62 0 1 0 16.62 12 4.62 4.62 0 0 0 12 7.38Zm0 7.62A3 3 0 1 1 15 12a3 3 0 0 1-3 3Zm5.88-7.8a1.08 1.08 0 1 1-1.08-1.08 1.08 1.08 0 0 1 1.08 1.08ZM21.94 8a7.3 7.3 0 0 0-2-5 7.3 7.3 0 0 0-5-2C13 .8 11 .8 9.94 1a7.3 7.3 0 0 0-5 2 7.3 7.3 0 0 0-2 5c-.12 2.06-.12 8 0 10a7.3 7.3 0 0 0 2 5 7.3 7.3 0 0 0 5 2c2.06.12 8 .12 10 0a7.3 7.3 0 0 0 5-2 7.3 7.3 0 0 0 2-5c.12-2.06.12-8 0-10Z' },
    { name: 'LinkedIn', href: 'https://linkedin.com/', path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56ZM22.22 0H1.77A1.75 1.75 0 0 0 0 1.73v20.54A1.75 1.75 0 0 0 1.77 24h20.45A1.75 1.75 0 0 0 24 22.27V1.73A1.75 1.75 0 0 0 22.22 0Z' },
  ],
}
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
  const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const submit = (e) => {
    e.preventDefault()
    // Needs a matching POST /contact route and controller in Laravel
    post('/contact', { preserveScroll: true, onSuccess: () => reset() })
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
                <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`} className="mt-1 block text-xl hover:underline">
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
                          <path d={s.path} />
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
                  disabled={processing}
                  className="bg-[#0d2a54] px-10 py-3.5 text-base font-semibold tracking-wide text-white transition hover:bg-[#12294f] disabled:opacity-60"
                >
                  {processing ? 'Sending...' : 'Send message'}
                </button>
                {wasSuccessful && (
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
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&output=embed`}
            className="h-[360px] w-full border-0 sm:h-full"
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