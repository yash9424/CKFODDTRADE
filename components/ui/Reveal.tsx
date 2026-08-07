'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger in ms, applied as a transition-delay. */
  delay?: number
  as?: ElementType
  /** Fire once the element is this fraction visible. */
  threshold?: number
  id?: string
}

/**
 * Scroll-triggered entrance. The `.reveal` class holds the element hidden until
 * the observer adds `.is-visible`; both live in globals.css so a single
 * transition definition is shared by every animated block on the site.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  threshold = 0.15,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Anything already on screen at mount (or when IO is unavailable) shows
    // immediately rather than waiting for a scroll that may never happen.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      id={id}
      ref={ref as never}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
