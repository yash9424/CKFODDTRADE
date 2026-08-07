'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { whatsappLink } from '@/lib/site'
import { cn } from '@/lib/cn'
import { Icon, WhatsAppGlyph } from '@/components/ui/Icon'

/**
 * Floating WhatsApp button (always available) plus a compact quote CTA that
 * appears on small screens once the header's gold button has scrolled away.
 */
export function FloatingActions() {
  const [showQuote, setShowQuote] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowQuote(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <Link
        href="/request-a-quote"
        className={cn(
          'flex items-center gap-2 bg-gold-500 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide2 text-emerald-950 shadow-gold transition-all duration-500 sm:hidden',
          showQuote
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0',
        )}
      >
        <Icon name="doc" className="h-4 w-4" strokeWidth={1.6} />
        Request a Quote
      </Link>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with CK Foodstuff on WhatsApp"
        className="group relative flex items-center gap-3 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-3.5 text-white shadow-[0_14px_34px_-12px_rgba(37,211,102,0.75)] transition-all duration-300 hover:pr-6 hover:shadow-[0_18px_44px_-12px_rgba(37,211,102,0.9)]"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <WhatsAppGlyph className="h-6 w-6 shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide2 opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">
          WhatsApp Us
        </span>
      </a>
    </div>
  )
}
