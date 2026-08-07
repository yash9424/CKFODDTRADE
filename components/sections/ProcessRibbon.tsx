import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

/**
 * Compact horizontal process graphic:
 * Producer → Procurement → QC → Export → Shipping → Distribution → Customer.
 * Scrolls horizontally on narrow screens rather than wrapping into a mess.
 */
const steps = [
  'Producer',
  'Procurement',
  'Quality Control',
  'Export',
  'Shipping',
  'Distribution',
  'Customer',
]

export function ProcessRibbon({
  items = steps,
  light = false,
}: {
  items?: string[]
  light?: boolean
}) {
  return (
    <Reveal className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <ol className="flex min-w-max items-center gap-2 sm:gap-3">
        {items.map((step, i) => (
          <li key={step} className="flex items-center gap-2 sm:gap-3">
            <span
              className={cn(
                'flex items-center gap-3 border px-4 py-3 sm:px-5',
                light
                  ? 'border-ivory/15 bg-emerald-950/50'
                  : 'border-emerald-950/10 bg-white shadow-card',
              )}
            >
              <span className="font-display text-[11px] font-semibold text-gold-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'whitespace-nowrap text-[12px] font-semibold uppercase tracking-wide2',
                  light ? 'text-ivory/85' : 'text-emerald-950',
                )}
              >
                {step}
              </span>
            </span>
            {i < items.length - 1 && (
              <span className="text-gold-500" aria-hidden="true">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
