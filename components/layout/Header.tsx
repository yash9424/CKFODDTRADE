'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { mainNav, type NavItem } from '@/data/navigation'
import { site, whatsappLink } from '@/lib/site'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { Logo } from './Logo'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Route change closes everything, otherwise the drawer survives navigation.
  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /** Small grace period so the pointer can travel from trigger to panel. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const solid = scrolled || mobileOpen || openMenu !== null
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-wide2 focus:text-emerald-950"
      >
        Skip to content
      </a>

      {/* Utility bar — collapses away as soon as the page scrolls */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-50 hidden overflow-hidden border-b border-ivory/10 bg-emerald-950 transition-all duration-500 lg:block',
          scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100',
        )}
      >
        <div className="container-ck flex h-10 items-center justify-between text-[11px] tracking-wide2 text-ivory/65">
          <p className="uppercase">
            Dubai · Surat · Mumbai <span className="mx-2 text-gold-500">|</span> International Food
            Trading, Sourcing &amp; Distribution
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-2 transition-colors hover:text-gold-300"
            >
              <Icon name="phone" className="h-3.5 w-3.5" strokeWidth={1.6} />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 transition-colors hover:text-gold-300"
            >
              <Icon name="mail" className="h-3.5 w-3.5" strokeWidth={1.6} />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'fixed inset-x-0 z-50 transition-all duration-500',
          scrolled ? 'top-0' : 'lg:top-10',
          solid
            ? 'border-b border-emerald-950/10 bg-ivory/95 shadow-[0_8px_30px_-18px_rgba(3,24,15,0.4)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
        onMouseLeave={scheduleClose}
      >
        <div className="container-ck flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
          <Logo light={!solid} />

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                solid={solid}
                active={isActive(item.href)}
                open={openMenu === item.label}
                onOpen={() => {
                  cancelClose()
                  setOpenMenu(item.children ? item.label : null)
                }}
                onClose={scheduleClose}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/request-a-quote"
              className="group hidden items-center gap-2 bg-gold-500 px-6 py-3 text-[11px] font-semibold uppercase tracking-wide2 text-emerald-950 shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 sm:inline-flex"
            >
              Request a Quote
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              >
                <path d="M1 8h13M9 3l5 5-5 5" />
              </svg>
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                'grid h-11 w-11 place-items-center border transition-colors xl:hidden',
                solid
                  ? 'border-emerald-950/15 text-emerald-950 hover:bg-emerald-950 hover:text-ivory'
                  : 'border-ivory/30 text-ivory hover:bg-ivory/10',
              )}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>

        {/* Desktop mega panel */}
        {mainNav.map((item) =>
          item.children ? (
            <MegaPanel
              key={item.label}
              item={item}
              open={openMenu === item.label}
              onEnter={cancelClose}
              onLeave={scheduleClose}
            />
          ) : null,
        )}
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} isActive={isActive} />
    </>
  )
}

function NavLink({
  item,
  solid,
  active,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem
  solid: boolean
  active: boolean
  open: boolean
  onOpen: () => void
  onClose: () => void
}) {
  return (
    <div onMouseEnter={onOpen} onFocus={onOpen} onMouseLeave={onClose}>
      <Link
        href={item.href}
        aria-expanded={item.children ? open : undefined}
        className={cn(
          'relative flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium tracking-[0.02em] transition-colors duration-300',
          solid
            ? active
              ? 'text-emerald-900'
              : 'text-charcoal hover:text-emerald-900'
            : active
              ? 'text-gold-300'
              : 'text-ivory/85 hover:text-ivory',
        )}
      >
        {item.label}
        {item.children && (
          <Icon
            name="chevron"
            className={cn('h-3 w-3 transition-transform duration-300', open && 'rotate-180')}
            strokeWidth={2}
          />
        )}
        <span
          className={cn(
            'absolute inset-x-3.5 -bottom-0.5 h-px bg-gold-500 transition-transform duration-300',
            active || open ? 'scale-x-100' : 'scale-x-0',
          )}
        />
      </Link>
    </div>
  )
}

function MegaPanel({
  item,
  open,
  onEnter,
  onLeave,
}: {
  item: NavItem
  open: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        'absolute inset-x-0 top-full hidden origin-top border-b border-emerald-950/10 bg-ivory shadow-[0_28px_60px_-30px_rgba(3,24,15,0.5)] transition-all duration-300 xl:block',
        open
          ? 'pointer-events-auto visible translate-y-0 opacity-100'
          : 'pointer-events-none invisible -translate-y-2 opacity-0',
      )}
    >
      <div className="container-ck grid grid-cols-12 gap-10 py-10">
        <div className="col-span-3 border-r border-emerald-950/10 pr-8">
          <p className="eyebrow rule-gold text-gold-700">{item.columnTitle}</p>
          <h3 className="mt-4 font-display text-2xl font-semibold text-emerald-950">
            {item.label}
          </h3>
          <Link
            href={item.href}
            className="link-underline mt-5 inline-flex text-[12px] font-semibold uppercase tracking-wide2 text-emerald-800"
          >
            View overview
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 8h13M9 3l5 5-5 5" />
            </svg>
          </Link>
        </div>

        <div className="col-span-9 grid grid-cols-3 gap-x-8 gap-y-2">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="group flex flex-col border-l-2 border-transparent py-3 pl-4 transition-all duration-300 hover:border-gold-500 hover:bg-ivory-200"
            >
              <span className="text-[15px] font-semibold text-emerald-950 transition-colors group-hover:text-emerald-700">
                {child.label}
              </span>
              {child.blurb && (
                <span className="mt-1 text-[12.5px] leading-relaxed text-charcoal-muted">
                  {child.blurb}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-emerald-950/10 bg-ivory-200">
        <div className="container-ck flex items-center justify-between py-4">
          <p className="text-[12.5px] text-charcoal-light">
            Buying at container scale? Send your product, quantity, packaging and destination port.
          </p>
          <Link
            href="/request-a-quote"
            className="text-[11px] font-semibold uppercase tracking-wide2 text-gold-700 transition-colors hover:text-emerald-900"
          >
            Request a Quote →
          </Link>
        </div>
      </div>
    </div>
  )
}

function MobileDrawer({
  open,
  onClose,
  isActive,
}: {
  open: boolean
  onClose: () => void
  isActive: (href: string) => boolean
}) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 xl:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-emerald-950/60 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      <nav
        aria-label="Mobile"
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-ivory pt-[72px] transition-transform duration-500 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex-1 px-6 py-8">
          {mainNav.map((item) => (
            <div key={item.href} className="border-b border-emerald-950/10">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex-1 py-4 font-display text-lg font-semibold transition-colors',
                    isActive(item.href) ? 'text-emerald-700' : 'text-emerald-950',
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="grid h-10 w-10 place-items-center text-emerald-900"
                  >
                    <Icon
                      name="chevron"
                      className={cn(
                        'h-4 w-4 transition-transform duration-300',
                        expanded === item.label && 'rotate-180',
                      )}
                      strokeWidth={2}
                    />
                  </button>
                )}
              </div>

              {item.children && (
                <div
                  className={cn(
                    'grid transition-all duration-300',
                    expanded === item.label
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-l border-gold-500/40 pb-4 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block py-2.5 text-[14px] text-charcoal-light transition-colors hover:text-emerald-800"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/request-a-quote"
              onClick={onClose}
              className="bg-gold-500 px-6 py-4 text-center text-[12px] font-semibold uppercase tracking-wide2 text-emerald-950"
            >
              Request a Quote
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-emerald-950/20 px-6 py-4 text-center text-[12px] font-semibold uppercase tracking-wide2 text-emerald-950"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="mt-8 space-y-2 text-[13px] text-charcoal-light">
            <a href={`tel:${site.phoneHref}`} className="block">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block">
              {site.email}
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
