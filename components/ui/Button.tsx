import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'gold' | 'emerald' | 'outline' | 'outlineLight' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-semibold uppercase tracking-wide2 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  gold:
    'bg-gold-500 text-emerald-950 shadow-gold hover:bg-gold-400 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(212,175,55,0.7)] active:translate-y-0',
  emerald:
    'bg-emerald-900 text-ivory hover:bg-emerald-800 hover:-translate-y-0.5 hover:shadow-cardHover active:translate-y-0',
  outline:
    'border border-emerald-950/25 text-emerald-950 hover:border-emerald-900 hover:bg-emerald-950 hover:text-ivory',
  outlineLight:
    'border border-ivory/35 text-ivory hover:border-gold-500 hover:bg-gold-500 hover:text-emerald-950',
  ghost: 'text-emerald-900 hover:text-gold-700',
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[11px]',
  md: 'px-7 py-3.5 text-xs',
  lg: 'px-9 py-4 text-[13px]',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  /** Adds the trailing arrow that slides on hover. */
  arrow?: boolean
}

export function Button({
  variant = 'gold',
  size = 'md',
  className,
  children,
  arrow = true,
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  )
}

export function ButtonLink({
  href,
  variant = 'gold',
  size = 'md',
  className,
  children,
  arrow = true,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'children'>) {
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')

  if (external) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
        {arrow && <Arrow />}
      </a>
    )
  }

  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  )
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  )
}
