import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

type Tone = 'ivory' | 'ivoryDeep' | 'emerald' | 'white'

const tones: Record<Tone, string> = {
  ivory: 'bg-ivory text-charcoal',
  ivoryDeep: 'bg-ivory-200 text-charcoal',
  white: 'bg-white text-charcoal',
  emerald: 'bg-emerald-deep text-ivory',
}

export function Section({
  children,
  className,
  tone = 'ivory',
  id,
  compact,
}: {
  children: ReactNode
  className?: string
  tone?: Tone
  id?: string
  compact?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden',
        compact ? 'py-16 sm:py-20' : 'py-20 sm:py-28 lg:py-32',
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  )
}

export function Eyebrow({
  children,
  light,
  className,
}: {
  children: ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <p
      className={cn(
        'eyebrow rule-gold',
        light ? 'text-gold-300' : 'text-gold-700',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  light,
  align = 'left',
  className,
  titleClassName,
  as: Tag = 'h2',
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  light?: boolean
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow light={light} className={cn(align === 'center' && 'inline-flex')}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className={cn(
          'mt-5 font-display text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.02em]',
          light && 'text-ivory',
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {lead && (
        <div
          className={cn(
            'mt-6 text-[17px] leading-[1.75]',
            light ? 'text-ivory/75' : 'text-charcoal-light',
          )}
        >
          {lead}
        </div>
      )}
    </Reveal>
  )
}

/** Thin gold-to-transparent divider used between major blocks. */
export function GoldRule({ className, light }: { className?: string; light?: boolean }) {
  return (
    <div
      className={cn(
        'h-px w-full',
        light
          ? 'bg-gradient-to-r from-gold-500/70 via-gold-500/15 to-transparent'
          : 'bg-gradient-to-r from-gold-500/60 via-emerald-950/10 to-transparent',
        className,
      )}
    />
  )
}
