import Link from 'next/link'
import { cn } from '@/lib/cn'

/**
 * Wordmark: a gold monogram seal beside the legal name. Sized off the
 * container so it holds up in both the transparent and condensed headers.
 */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="CK Foodstuff Trading LLC — home"
      className={cn('group flex items-center gap-3', className)}
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center">
        <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="logo-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A9851E" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="62%" stopColor="#F3E5BE" />
              <stop offset="100%" stopColor="#A9851E" />
            </linearGradient>
          </defs>
          <path
            d="M24 1.5 44.5 11v18c0 9.4-8.2 15.6-20.5 18.5C11.7 44.6 3.5 38.4 3.5 29V11L24 1.5Z"
            fill="none"
            stroke="url(#logo-gold)"
            strokeWidth="1.6"
          />
          <path
            d="M24 5.5 40.5 13v15.6c0 7.6-6.7 12.8-16.5 15.2C14.2 41.4 7.5 36.2 7.5 28.6V13L24 5.5Z"
            fill="url(#logo-gold)"
            opacity="0.12"
          />
        </svg>
        <span
          className={cn(
            'relative font-display text-[15px] font-semibold leading-none tracking-[0.02em]',
            light ? 'text-gold-300' : 'text-gold-700',
          )}
        >
          CK
        </span>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[17px] font-semibold tracking-[-0.01em] sm:text-[19px]',
            light ? 'text-ivory' : 'text-emerald-950',
          )}
        >
          CK Foodstuff
        </span>
        <span
          className={cn(
            'mt-1 text-[9px] font-semibold uppercase tracking-[0.28em]',
            light ? 'text-ivory/55' : 'text-charcoal-muted',
          )}
        >
          Trading LLC
        </span>
      </span>
    </Link>
  )
}
