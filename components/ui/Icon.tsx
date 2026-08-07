import { cn } from '@/lib/cn'

export type IconName = keyof typeof paths

/**
 * Single-stroke line icons drawn on a 24x24 grid so weight stays consistent
 * wherever they sit (emerald on ivory, gold on emerald).
 */
const paths = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9S14.6 18.4 12 21c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" />
    </>
  ),
  handshake: (
    <>
      <path d="m8 12 2.4 2.4a1.7 1.7 0 0 0 2.4 0L18 9.2" />
      <path d="M2 8.5 6 5l4 2.5 4-2.5 4 3.5" />
      <path d="M2 8.5v6l4 4.5 2.6-2.6M22 8.5v6l-4 4.5-3-3" />
    </>
  ),
  ship: (
    <>
      <path d="M3 18.5c1.6 0 1.6 1.5 3.2 1.5s1.6-1.5 3.2-1.5 1.6 1.5 3.2 1.5 1.6-1.5 3.2-1.5 1.6 1.5 3.2 1.5" />
      <path d="M4.5 15 6 9.5h12L19.5 15" />
      <path d="M12 9.5V4M8.5 6.5h7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v6c0 4.3 3.1 7.8 7.5 9 4.4-1.2 7.5-4.7 7.5-9V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  route: (
    <>
      <circle cx="5.5" cy="5.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
      <path d="M8 5.5h6.5A3.5 3.5 0 0 1 18 9v0a3.5 3.5 0 0 1-3.5 3.5h-5A3.5 3.5 0 0 0 6 16v0a3.5 3.5 0 0 0 3.5 2.5H16" />
    </>
  ),
  warehouse: (
    <>
      <path d="M3 20V9.2L12 5l9 4.2V20" />
      <path d="M7 20v-6h10v6" />
      <path d="M7 17h10M3 20h18" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V6.5L12 3l8 3.5V21" />
      <path d="M9 21v-4.5h6V21" />
      <path d="M8.5 9h2M13.5 9h2M8.5 12.5h2M13.5 12.5h2M3 21h18" />
    </>
  ),
  boxes: (
    <>
      <path d="M3 8.5 7.5 6 12 8.5v5L7.5 16 3 13.5v-5Z" />
      <path d="M12 8.5 16.5 6 21 8.5v5L16.5 16 12 13.5" />
      <path d="M7.5 11 3 8.5M7.5 11l4.5-2.5M7.5 11v5M16.5 11 12 8.5M16.5 11l4.5-2.5M16.5 11v5" />
    </>
  ),
  cart: (
    <>
      <path d="M2.5 4h2.2l2.3 10.5h10L19.5 7H6" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="16.5" cy="19" r="1.4" />
    </>
  ),
  bell: (
    <>
      <path d="M6.5 17V11a5.5 5.5 0 0 1 11 0v6" />
      <path d="M4.5 17h15M10 20h4" />
      <path d="M12 5.5V3.5" />
    </>
  ),
  chef: (
    <>
      <path d="M7 20h10v-6H7v6Z" />
      <path d="M7 14a4 4 0 0 1-1-7.9A3.6 3.6 0 0 1 12 4a3.6 3.6 0 0 1 6 2.1A4 4 0 0 1 17 14" />
    </>
  ),
  factory: (
    <>
      <path d="M3 20V10l5.5 3.5V10L14 13.5V7l7 3.5V20Z" />
      <path d="M3 20h18M7 16.5v1.5M11.5 16.5v1.5M16 16.5v1.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c0-8 5-13 16-13 0 8-4.5 13-11 13a5 5 0 0 1-5 0Z" />
      <path d="M4 20c3-6 7-9 12-11" />
    </>
  ),
  grain: (
    <>
      <path d="M12 21V9" />
      <path d="M12 9c0-3 1.6-5.5 4.5-6.5C17 5.6 15.4 8.2 12 9Z" />
      <path d="M12 9C12 6 10.4 3.5 7.5 2.5 7 5.6 8.6 8.2 12 9Z" />
      <path d="M12 15c0-3 1.6-5 4.5-6 .5 3-1.1 5.2-4.5 6Z" />
      <path d="M12 15c0-3-1.6-5-4.5-6-.5 3 1.1 5.2 4.5 6Z" />
    </>
  ),
  spice: (
    <>
      <path d="M3.5 12.5h17A8.5 8.5 0 0 1 12 20a8.5 8.5 0 0 1-8.5-7.5Z" />
      <path d="M8 9.5c0-1.2 1.8-1.2 1.8-2.5S8 4.5 8 3.3M14 9.5c0-1.2 1.8-1.2 1.8-2.5S14 4.5 14 3.3" />
    </>
  ),
  fruit: (
    <>
      <circle cx="12" cy="14" r="6.5" />
      <path d="M12 7.5V4.5M12 4.5c2 0 3.2-1 3.5-2.5-2 0-3.2.8-3.5 2.5Z" />
      <path d="M9.5 12.5c.6 1.4 2 2.2 3.4 1.8" />
    </>
  ),
  carrot: (
    <>
      <path d="M6 18.5 15 9.4a4.5 4.5 0 0 0-6.4-6.3L4.4 16.3a1.4 1.4 0 0 0 1.6 2.2Z" />
      <path d="m14 4 3.5-1M16.5 6.5 20.5 6M18 9.5l2.5 1.5" />
    </>
  ),
  dairy: (
    <>
      <path d="M8 3h8l-1 3.5 2 3V21H7V9.5l2-3L8 3Z" />
      <path d="M7 13h10" />
    </>
  ),
  phone: (
    <>
      <path d="M4.5 4h4l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L16 14l4 1.5v4a1 1 0 0 1-1.1 1A16.5 16.5 0 0 1 3.5 5.1 1 1 0 0 1 4.5 4Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.4 2" />
    </>
  ),
  check: <path d="m4.5 12.5 4.8 4.8L19.5 7" />,
  chevron: <path d="m7 10 5 5 5-5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  upload: (
    <>
      <path d="M12 16V4.5M7.5 9 12 4.5 16.5 9" />
      <path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M6.5 20V13M11 20V8M15.5 20v-4.5M20 20V5" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h7.5L19 8.5V21H6V3Z" />
      <path d="M13.5 3v5.5H19M9 13h6M9 16.5h6" />
    </>
  ),
  whatsapp: null,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
} as const

export function Icon({
  name,
  className,
  strokeWidth = 1.4,
}: {
  name: IconName
  className?: string
  strokeWidth?: number
}) {
  if (name === 'whatsapp') return <WhatsAppGlyph className={className} />

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn('h-6 w-6', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn('h-6 w-6', className)}
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.65-1.23-1.46-1.38-1.71-.14-.24-.01-.37.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.47-.01c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.18 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.47-.29Z" />
    </svg>
  )
}
