import React, { useEffect, useState } from 'react'

const ArrowUp = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-5 w-5 sm:h-6 sm:w-6"
  >
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
)

export default function BackToTop({
  threshold = 400, // px scrolled before the button appears
  whatsappNumber = '9851168157', // <-- replace with your number (no +, no spaces)
  whatsappMessage = "Hi! I'd like to know more.",
  whatsappIcon = '/images/whatsapp.png', // <-- your image path
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6 sm:gap-4 lg:bottom-8 lg:right-8"
      aria-label="Quick actions"
    >
      {/* Back to top — appears after scrolling */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#112d5e] text-white shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:bg-[#0d2349] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#112d5e]/60 focus-visible:ring-offset-2 sm:h-12 sm:w-12 lg:h-14 lg:w-14 ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp />
      </button>

      {/* WhatsApp — always visible */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12 lg:h-14 lg:w-14"
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          draggable="false"
          className="h-full w-full object-contain"
        />
      </a>
    </div>
  )
}