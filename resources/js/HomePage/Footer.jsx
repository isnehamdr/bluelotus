import React, { useState } from 'react'
import { Link } from '@inertiajs/react'

const FOOTER_LINKS = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Accessibility', href: '/accessibility' },
]

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

/* Text field with a small uppercase label that sits inside the box and floats up when filled */
function Field({ label, name, type = 'text', value, onChange, autoComplete, className = '' }) {
  return (
    <div className={`relative h-12 bg-white ${className}`}>
      <input
        id={`nl-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        placeholder=" "
        className="peer h-full w-full bg-transparent px-3.5 pb-1 pt-4 text-sm text-[#001a44] outline-none focus:ring-2 focus:ring-inset focus:ring-[#001a44]/40"
      />
      <span aria-hidden="true" className="pointer-events-none absolute left-1.5 top-1 text-[10px] leading-none text-red-600">
        *
      </span>
      <label
        htmlFor={`nl-${name}`}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#001a44] transition-all duration-150 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[9px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[9px]"
      >
        {label}
      </label>
    </div>
  )
}

export default function Footer({
  onSubscribe, // optional: async (values) => void. Wire this to your Inertia route.
  address = '2001 Market Street Suite 3500, Philadelphia, PA, 19103',
}) {
  const [values, setValues] = useState({ firstName: '', lastName: '', zip: '', email: '' })
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      if (onSubscribe) await onSubscribe(values)
      setStatus('success')
      setValues({ firstName: '', lastName: '', zip: '', email: '' })
      setAgree(false)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Careers banner */}
      <div className="bg-[#001a44] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-16">
          <div>
            <p className="text-xl font-semibold uppercase tracking-[0.15em] text-[#bc8b29]">Discover Your Future</p>
            <h2 className="mt-3 text-2xl font-semibold leading-snug sm:text-4xl">Explore Careers at Blue Lotus Hospitality</h2>
          </div>
          <Link
            href="/careers"
            className="flex h-11 w-full items-center justify-center border border-[#bc8b29] text-md font-medium uppercase  text-[#bc8b29] transition-colors hover:bg-[#bc8b29] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:w-[320px] lg:h-[72px]"
          >
            Opportunities
          </Link>
        </div>
      </div>

      {/* Newsletter + legal */}
      <div className="bg-gradient-to-b from-[#ebe9e4] from-80% to-[#d3cfc7] text-[#001a44]">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:px-10 md:pt-16 lg:px-16 lg:pb-24">
          <h3 className="text-lg font-semibold uppercase tracking-[0.15em] text-[#bc8b29]">Sign Up for Our Newsletter</h3>
          <p className="mt-6 max-w-sm text-lg leading-relaxed">
            Sign up here to receive the latest news and updates from Blue Lotus Hospitality.
          </p>

          <form onSubmit={submit} className="mt-8" noValidate={false}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[150fr_150fr_113fr_187fr]">
              <Field label="First name" name="firstName" value={values.firstName} onChange={update} autoComplete="given-name" />
              <Field label="Last name" name="lastName" value={values.lastName} onChange={update} autoComplete="family-name" />
              <Field label="Zip code" name="zip" value={values.zip} onChange={update} autoComplete="postal-code" />
              <Field label="Email" name="email" type="email" value={values.email} onChange={update} autoComplete="email" />
            </div>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between md:mt-8">
              <label className="flex cursor-pointer items-center gap-3 text-xs font-semibold uppercase tracking-[0.08em]">
                <input
                  type="checkbox"
                  required
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border border-slate-400 bg-white checked:bg-[#001a44] checked:ring-[3px] checked:ring-inset checked:ring-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#001a44]"
                />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" className="underline-offset-2 hover:underline">
                    Terms and Conditions
                  </Link>{' '}
                  |{' '}
                  <Link href="/privacy-policy" className="underline-offset-2 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="h-11 w-full border border-[#bc8b29] text-xs font-semibold uppercase tracking-[0.15em] text-[#bc8b29] transition-colors hover:bg-[#bc8b29] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#001a44] disabled:opacity-60 sm:w-56 lg:h-[37px] lg:w-[30%]"
              >
                {status === 'sending' ? 'Sending…' : 'Subscribe'}
              </button>
            </div>

            <p role="status" aria-live="polite" className="mt-4 min-h-[1.25rem] text-base">
              {status === 'success' && 'Thanks for subscribing.'}
              {status === 'error' && 'Something went wrong. Please try again.'}
            </p>
          </form>

          {/* Legal row */}
          <div className="mt-10 border-t border-slate-400 pt-5 lg:mt-14">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="text-xs uppercase leading-relaxed tracking-[0.06em]">
                <p className="font-semibold">© Blue Lotus Hospitality {new Date().getFullYear()}.</p>
                <p>
                  <span className="font-semibold">Blue Lotus Hospitality.</span>{' '}
                  <span className="text-[#001a44]/70">{address}</span>
                </p>
              </div>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.06em]">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blue Lotus Hospitality on LinkedIn"
              className="mt-5 inline-block p-1 text-[#001a44] hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#001a44]"
            >
              <LinkedInIcon />
            </a>

            {/* Crafted by */}
            <p className="mt-5 text-xs uppercase tracking-[0.06em] text-[#001a44]/70">
              Crafted by{' '}
              <a
                href="https://sait.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#001a44] underline-offset-2 hover:underline"
              >
                S.A.I.T Solution Nepal
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}